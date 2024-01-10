import { Component, OnInit } from '@angular/core';
import { Chess } from 'chess.js';
import { Partita } from '../model/partita';
import { PartitaService } from '../services/partita.service';
import {ActivatedRoute, Router} from '@angular/router';

declare var Chessboard2: any;

@Component({
  selector: 'app-add-partita',
  templateUrl: './add-partita.component.html',
  styleUrl: './add-partita.component.css'
})
export class AddPartitaComponent implements OnInit{
    static game: Chess = new Chess();
    static board?: any;
    partita?: Partita;
    static gameStatus: string = "";
    static gameState: string = "0";
    mosse: string[][] = [];

    gameStatusPublic: string = "";
    commentoAttuale: string = "";
    risultato: string = "";
    positionEnded: boolean = false;

    config = {
      draggable: true,
      position: 'start',
      onDragStart: this.onDragStart,
      onDrop: this.onDrop,
    }

    constructor(private partitaService : PartitaService, private activatedRoute: ActivatedRoute, private router:Router){}

    ngOnInit(): void {
      this.partitaService.dammiPartita(parseInt(this.activatedRoute.snapshot.queryParams['id'])).subscribe(partita => this.partita = partita)
      try{
        AddPartitaComponent.board = Chessboard2('board', this.config);
        window.setInterval(() => {
          this.updateStats();
        }, 60);
        window.setTimeout(() => {
          this.caricamentoPartita();
        }, 250);
    }catch(e){}
    }

    caricamentoPartita(): void {
      this.risultato = this.partita!.esito;
      if (this.partita?.pgn == null || this.partita.pgn == "") {
        return;
      }
      try{
      AddPartitaComponent.game.loadPgn(this.partita.pgn);
      }
      catch(e){
        return;
      }
    }

    updateStats(): void {
      if(this.gameStatusPublic != AddPartitaComponent.gameStatus)
        this.commentoAttuale = AddPartitaComponent.game.getComment();
      this.gameStatusPublic = AddPartitaComponent.gameStatus;
      if(AddPartitaComponent.gameState != "0"){
        this.risultato = AddPartitaComponent.gameState;
        this.positionEnded = true;
      }else{
        this.positionEnded = false;
      }

      this.mosse = [];
      let cont : number = 0;
      AddPartitaComponent.game.history().forEach(mossa => {
        if (cont % 2 == 0) {
          this.mosse.push([])
          this.mosse[this.mosse.length - 1].push(cont / 2 + 1 + "");
        }
        this.mosse[this.mosse.length - 1].push(mossa);
        cont++;
      });
    }

    onDragStart (dragStartEvt : any) : any{
      if (AddPartitaComponent.game.isGameOver()) {
        return false;
      }

      if (AddPartitaComponent.game.turn() === 'w' && !AddPartitaComponent.isWhitePiece(dragStartEvt.piece)) return false;
      if (AddPartitaComponent.game.turn() === 'b' && !AddPartitaComponent.isBlackPiece(dragStartEvt.piece)) return false;

      const legalMoves = AddPartitaComponent.game.moves({
        square: dragStartEvt.square,
        verbose: true
      })

      legalMoves?.forEach((move : any) => {
        AddPartitaComponent.board.addCircle(move.to);
      })
    }

    onDrop (dropEvt : any) : any{
      let move;
      AddPartitaComponent.board.clearCircles();
      try {
        move = AddPartitaComponent.game.move({
          from: dropEvt.source,
          to: dropEvt.target,
          promotion: 'q',
        })
      }
      catch (e) {
        return 'snapback'
      }


      AddPartitaComponent.board.fen(AddPartitaComponent.game.fen());

      AddPartitaComponent.updateStatus();
    }

    static isWhitePiece (piece : string) : boolean { return /^w/.test(piece); }
    static isBlackPiece (piece : string) : boolean{ return /^b/.test(piece); }

    static updateStatus () : void{
      let statusHTML = '';
      let esito = '0';

      const whosTurn = AddPartitaComponent.game.turn() === 'w' ? 'White' : 'Black';

      if (!AddPartitaComponent.game.isGameOver()) {
        if (AddPartitaComponent.game.inCheck()) statusHTML = whosTurn + ' is in check! ';
        statusHTML = statusHTML + whosTurn + ' to move.';
      } else if (AddPartitaComponent.game.isCheckmate() && AddPartitaComponent.game.turn() == 'w') {
        statusHTML = 'Game over: white is in checkmate. Black wins!';
        esito = '2';
      } else if (AddPartitaComponent.game.isCheckmate() && AddPartitaComponent.game.turn() == 'b') {
        statusHTML = 'Game over: black is in checkmate. White wins!';
        esito = '1';
      } else if (AddPartitaComponent.game.isStalemate() && AddPartitaComponent.game.turn() == 'w') {
        statusHTML = 'Game is drawn. White is stalemated.';
        esito = '3';
      } else if (AddPartitaComponent.game.isStalemate() && AddPartitaComponent.game.turn() == 'b') {
        statusHTML = 'Game is drawn. Black is stalemated.';
        esito = '3';
      } else if (AddPartitaComponent.game.isThreefoldRepetition()) {
        statusHTML = 'Game is drawn by threefold repetition rule.';
        esito = '3';
      } else if (AddPartitaComponent.game.isInsufficientMaterial()) {
        statusHTML = 'Game is drawn by insufficient material.';
        esito = '3';
      } else if (AddPartitaComponent.game.isDraw()) {
        statusHTML = 'Game is drawn by fifty-move rule.';
        esito = '3';
      }
      AddPartitaComponent.gameState = esito;
      AddPartitaComponent.gameStatus = statusHTML;
    }

    undoMove(): void {
      AddPartitaComponent.game.undo();
      AddPartitaComponent.board.fen(AddPartitaComponent.game.fen());
      AddPartitaComponent.updateStatus();
      this.commentoAttuale = AddPartitaComponent.game.getComment();
    }

    salvaCommento(): void {
      if (this.commentoAttuale == "")
        return;
      AddPartitaComponent.game.setComment(this.commentoAttuale);
      AddPartitaComponent.updateStatus();
    }

    cancellaCommento(): void {
      this.commentoAttuale = "";
      AddPartitaComponent.game.deleteComment();
      AddPartitaComponent.updateStatus();
    }

    generaHeaderPGN(): void {
      if(this.partita?.torneo?.nome != null && this.partita?.torneo?.nome != "")
        AddPartitaComponent.game.header('Event', this.partita.torneo.nome + "");
      if(this.partita?.torneo?.luogo != null && this.partita?.torneo?.luogo != "")
        AddPartitaComponent.game.header('Site', this.partita.torneo.luogo + "");
      if(this.partita?.torneo?.dataInizio != null && this.partita?.torneo?.dataInizio + "" != "")
        AddPartitaComponent.game.header('Date', this.partita.torneo.dataInizio.getDate + "");
      if(this.partita?.turno != null && this.partita?.turno + "" != "")
        AddPartitaComponent.game.header('Round', this.partita?.turno + "");
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
      AddPartitaComponent.game.header('Result', result);
      if(this.partita?.giocatore1?.cognome != null && this.partita?.giocatore1?.cognome != "" && this.partita?.giocatore1?.nome != null && this.partita?.giocatore1?.nome != "")
        AddPartitaComponent.game.header('White', this.partita?.giocatore1?.cognome + "" + this.partita?.giocatore1.nome);
      if(this.partita?.giocatore2?.cognome != null && this.partita?.giocatore2?.cognome != "" && this.partita?.giocatore2?.nome != null && this.partita?.giocatore2?.nome != "")
        AddPartitaComponent.game.header('Black', this.partita?.giocatore2?.cognome + "" + this.partita?.giocatore2.nome);
      }

    salvaPartita(): void {
      this.generaHeaderPGN();
      AddPartitaComponent.updateStatus();
      if(this.partita == null)
        return;
      if(AddPartitaComponent.game.fen() != "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
        this.partita.pgn = AddPartitaComponent.game.pgn();
      this.partita.esito = this.risultato;
      this.partitaService.salvaPartita(this.partita).subscribe(result=> {
        if(this.partita?.torneo?.id != null)
          this.router.navigate(['/torneo'], {queryParams: {torneoId: this.partita?.torneo?.id}});
        else
          this.router.navigate(['/partita'], {queryParams: {id: this.partita?.id}});
        }
      );
    }

    importa(event: any) : void {
      const File = event.target.files[0];
      if(File)
        this.readFile(File);
    }

    readFile(file: File) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        const fileContent = fileReader.result as string;
        AddPartitaComponent.game.loadPgn(fileContent);
        AddPartitaComponent.board.fen(AddPartitaComponent.game.fen());
        console.log(AddPartitaComponent.game.pgn());
        AddPartitaComponent.updateStatus();
      };

      fileReader.readAsText(file);
    }



}
