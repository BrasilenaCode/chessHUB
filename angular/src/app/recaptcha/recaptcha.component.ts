import { Component, Output } from '@angular/core';
import { RecaptchaServiceService } from '../services/recaptcha-service.service';
import { Chess } from 'chess.js';
import { EventEmitter } from '@angular/core';

declare var Chessboard2: any;

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrl: './recaptcha.component.css'
})
export class RecaptchaComponent {
  // TODO da commentare
  @Output() onCaptchaComplete = new EventEmitter<boolean>();

  constructor(private recaptchaService: RecaptchaServiceService) { }

  stato: string = "Sto caricando la sfida...";
  challenge?: string;
  response?: string;
  static board?: any;
  static game: Chess = new Chess();
  static end: boolean = false;
  static positioning: boolean = true;

  config = {
    draggable: true,
    onDragStart: this.onDragStart,
    onDrop: this.onDrop,
    onChange: this.onChange,
  }

  ngOnInit(): void {
    try {
      RecaptchaComponent.board = Chessboard2('board', this.config);
    }catch(e){}
    this.recaptchaService.getCaptcha().subscribe(
      (response) => {
        this.challenge = response;
        try{RecaptchaComponent.board.fen(response);}catch(e){}
        RecaptchaComponent.game.load(response);
        this.stato = "Fai matto in 1 mossa!";
      }
    )
    try{
      window.setInterval(() => {
        if(RecaptchaComponent.end){
          RecaptchaComponent.end = false;
          this.check(this.challenge!, RecaptchaComponent.game.fen());
        }
      }, 60);

    }catch(e){}
  }

  onDragStart (dragStartEvt : any) : any{
    if (RecaptchaComponent.game.isGameOver() || RecaptchaComponent.end) {
      return false;
    }

    if (RecaptchaComponent.game.turn() === 'w' && !RecaptchaComponent.isWhitePiece(dragStartEvt.piece)) return false;
    if (RecaptchaComponent.game.turn() === 'b' && !RecaptchaComponent.isBlackPiece(dragStartEvt.piece)) return false;

    const legalMoves = RecaptchaComponent.game.moves({
      square: dragStartEvt.square,
      verbose: true
    })

    legalMoves?.forEach((move : any) => {
      RecaptchaComponent.board.addCircle(move.to);
    })
  }

  onDrop (dropEvt : any) : any{
    let move;
    RecaptchaComponent.board.clearCircles();
    try {
      move = RecaptchaComponent.game.move({
        from: dropEvt.source,
        to: dropEvt.target,
        promotion: 'q',
      })
    }
    catch (e) {
      return 'snapback'
    }
    RecaptchaComponent.board.fen(RecaptchaComponent.game.fen());
  }

  onChange (): void{
    if(RecaptchaComponent.positioning){
      RecaptchaComponent.positioning = false;
      return;
    }
    RecaptchaComponent.end = true;
  }

  static isWhitePiece (piece : string) : boolean { return /^w/.test(piece); }
  static isBlackPiece (piece : string) : boolean{ return /^b/.test(piece); }

  // chiamata al backend per verificare che il captcha è risolto
  check(challenge: string, response: string) : void{
    this.recaptchaService.checkCaptcha(challenge, response).subscribe(
      (response) => {
        if(response){
          this.stato = "Sfida superata! Complimenti!";
          this.complete();
        }
        else{
            this.stato = "Sfida fallita! Riprova!";
          try{window.setTimeout(() => {
            RecaptchaComponent.board.fen(challenge);
            RecaptchaComponent.game.load(challenge);
            RecaptchaComponent.end = false;
          }, 1000);}catch(e){}
        }
      }
    )
  }

  complete() : void{
    this.onCaptchaComplete.emit(true);
  }

}
