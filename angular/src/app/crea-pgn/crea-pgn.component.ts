import { Component, OnInit } from '@angular/core';
import { Chess } from 'chess.js';

declare var Chessboard2: any;

@Component({
  selector: 'app-crea-pgn',
  templateUrl: './crea-pgn.component.html',
  styleUrl: './crea-pgn.component.css'
})
export class CreaPgnComponent implements OnInit{
  static game: Chess = new Chess();
  static board?: any;

  config = {
    draggable: true,
    position: 'start',
    onDragStart: this.onDragStart,
    onDrop: this.onDrop,
  }

  static gameStatus: string = "";
  static gameState: string = "0";

  gameStatusPublic: string = "";

  colore : string = "bianco";
  risultato : string= "0";
  io : string = "Manu";
  avversario : string = "";
  nomeTorneo : string = "";
  dataTorneo : any;
  luogoTorneo : string = "";
  turno : number = 0;

  commentoAttuale : string = "";

  mosse : string[][] = [];
  positionEnded : boolean = false;

  constructor() {}

  ngOnInit(): void {
    try{
      CreaPgnComponent.board = Chessboard2('board', 'start');
    }catch(e){}

    setInterval(() => {
      this.updateStats();
    }, 60);
  }

  salvaCommento(): void {
    if (this.commentoAttuale == "")
    return;
  CreaPgnComponent.game.setComment(this.commentoAttuale);
  CreaPgnComponent.updateStatus();
  }

  cancellaCommento(): void {
    this.commentoAttuale = "";
    CreaPgnComponent.game.deleteComment();
    CreaPgnComponent.updateStatus();

  }

  undoMove(): void {
    if(CreaPgnComponent.board == null)
      console.log("board null");
    CreaPgnComponent.game.undo();
    CreaPgnComponent.board.position(CreaPgnComponent.game.fen());
    CreaPgnComponent.updateStatus();
  }

  generaPGN(): void {
    CreaPgnComponent.game.header('Event', this.nomeTorneo);
    CreaPgnComponent.game.header('Site', this.luogoTorneo);
    CreaPgnComponent.game.header('Date', this.dataTorneo.toString());
    CreaPgnComponent.game.header('Round', this.turno.toString());
    let result = "";
    if(this.risultato == "1")
      result = "1-0";
    else if(this.risultato == "2")
      result = "0-1";
    else if(this.risultato == "3")
      result = "1/2-1/2";
    else{
      result = "NC";
    }
    CreaPgnComponent.game.header('Result', result);
    if(this.io != ""){
      CreaPgnComponent.game.header('White', this.io);
      CreaPgnComponent.game.header('Black', this.avversario);
    }else{
      CreaPgnComponent.game.header('White', this.avversario);
      CreaPgnComponent.game.header('Black', this.io);
    }
    this.salvaPgn();
  }

  salvaPgn(): void {
    let pgn = CreaPgnComponent.game.pgn();
    console.log(pgn);
  }

  updateStats(): void {
    if(this.gameStatusPublic != CreaPgnComponent.gameStatus)
      this.commentoAttuale = CreaPgnComponent.game.getComment();
    this.gameStatusPublic = CreaPgnComponent.gameStatus;
    if(CreaPgnComponent.gameState != "0"){
      this.risultato = CreaPgnComponent.gameState;
      this.positionEnded = true;
    }else{
      this.positionEnded = false;
    }
    this.mosse = [];
    let cont : number = 0;
    CreaPgnComponent.game.history().forEach(mossa => {
      if (cont % 2 == 0) {
        this.mosse.push([])
        this.mosse[this.mosse.length - 1].push(cont / 2 + 1 + "");
      }
      this.mosse[this.mosse.length - 1].push(mossa);
      cont++;
    });
  }

  static isWhitePiece(piece : String): boolean {
    return piece.search(/^w/) !== -1
  }

  static isBlackPiece(piece : String): boolean {
    return piece.search(/^b/) !== -1
  }

  onDrop (dropEvt : any) : any{
    let move;
    CreaPgnComponent.board.clearCircles();
    try {
      move = CreaPgnComponent.game.move({
        from: dropEvt.source,
        to: dropEvt.target,
        promotion: 'q',
      })
    }
    catch (e) {
      return 'snapback'
    }

    if (move === null) return 'snapback'

    CreaPgnComponent.board.fen(CreaPgnComponent.game.fen());

    CreaPgnComponent.updateStatus();
  }

  onDragStart (dragStartEvt : any) : any{
    if (CreaPgnComponent.game.isGameOver()) {
      return false;
    }

    if (CreaPgnComponent.game.turn() === 'w' && !CreaPgnComponent.isWhitePiece(dragStartEvt.piece)) return false;
    if (CreaPgnComponent.game.turn() === 'b' && !CreaPgnComponent.isBlackPiece(dragStartEvt.piece)) return false;

    const legalMoves = CreaPgnComponent.game.moves({
      square: dragStartEvt.square,
      verbose: true
    })

    legalMoves?.forEach((move : any) => {
      CreaPgnComponent.board.addCircle(move.to);
    })
  }

  static updateStatus(): void {
    let statusHTML = '';
    let esito = '0';

    const whosTurn = CreaPgnComponent.game.turn() === 'w' ? 'White' : 'Black';

    if (!CreaPgnComponent.game.isGameOver()) {
      if (CreaPgnComponent.game.inCheck()) statusHTML = whosTurn + ' is in check! ';
      statusHTML = statusHTML + whosTurn + ' to move.';
    } else if (CreaPgnComponent.game.isCheckmate() && CreaPgnComponent.game.turn() == 'w') {
      statusHTML = 'Game over: white is in checkmate. Black wins!';
      esito = '2';
    } else if (CreaPgnComponent.game.isCheckmate() && CreaPgnComponent.game.turn() == 'b') {
      statusHTML = 'Game over: black is in checkmate. White wins!';
      esito = '1';
    } else if (CreaPgnComponent.game.isStalemate() && CreaPgnComponent.game.turn() == 'w') {
      statusHTML = 'Game is drawn. White is stalemated.';
      esito = '3';
    } else if (CreaPgnComponent.game.isStalemate() && CreaPgnComponent.game.turn() == 'b') {
      statusHTML = 'Game is drawn. Black is stalemated.';
      esito = '3';
    } else if (CreaPgnComponent.game.isThreefoldRepetition()) {
      statusHTML = 'Game is drawn by threefold repetition rule.';
      esito = '3';
    } else if (CreaPgnComponent.game.isInsufficientMaterial()) {
      statusHTML = 'Game is drawn by insufficient material.';
      esito = '3';
    } else if (CreaPgnComponent.game.isDraw()) {
      statusHTML = 'Game is drawn by fifty-move rule.';
      esito = '3';
    }
    CreaPgnComponent.gameState = esito;
    CreaPgnComponent.gameStatus = statusHTML;
  }

}
