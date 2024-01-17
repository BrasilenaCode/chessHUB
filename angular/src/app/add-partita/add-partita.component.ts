import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { Chess } from 'chess.js';
import { Partita } from '../model/partita';
import { PartitaService } from '../services/partita.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {isPlatformBrowser} from "@angular/common";

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
    static gameState: string = "0";
    mosse: string[][] = [];

    commentoAttuale: string = "";
    risultato: string = "";
    positionEnded: boolean = false;
    fenAttuale : string = "";

    config = {
      draggable: true,
      position: 'start',
      onDragStart: this.onDragStart,
      onDrop: this.onDrop,
    }

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private partitaService : PartitaService, private activatedRoute: ActivatedRoute, private router:Router){}

    // Prendo la partita dal database e carico le informazioni sulla pagina
    ngOnInit(): void {
      this.router.events.subscribe((event: any) => {
        if (event && event.routerEvent instanceof NavigationEnd && isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0);
        }
      });
      this.partitaService.dammiPartita(parseInt(this.activatedRoute.snapshot.queryParams['id'])).subscribe(partita => 
        {this.partita = partita;
          this.caricamentoPartita();
        })
      try{
        AddPartitaComponent.board = Chessboard2('board', this.config);
        window.setInterval(() => {
          this.updateStats();
        }, 60);
    }catch(e){}
    }

    // Carica la partita nella board e nel motore logico (chess.js)
    caricamentoPartita(): void {
      this.risultato = this.partita!.esito;
      if (this.partita?.pgn == null || this.partita.pgn == "") {
        return;
      }
      try{
        AddPartitaComponent.game.loadPgn(this.partita.pgn);
        AddPartitaComponent.board.fen(AddPartitaComponent.game.fen());
      }
      catch(e){}
    }

    // Aggiorno le informazioni sulla pagina
    updateStats(): void {
      if(this.fenAttuale == AddPartitaComponent.game.fen())
        return;
      this.fenAttuale = AddPartitaComponent.game.fen();
      if(this.commentoAttuale != AddPartitaComponent.game.getComment())
        this.commentoAttuale = AddPartitaComponent.game.getComment();
      if(AddPartitaComponent.gameState != "0"){
        this.risultato = AddPartitaComponent.gameState;
        this.positionEnded = true;
      }
      this.updateFormulario();
    }

    // Aggiorno il formulario con le mosse
    updateFormulario(): void {
      this.mosse = [];
      let cont : number = 0;
      AddPartitaComponent.game.history({verbose : true}).forEach(mossa => {
        if (cont % 2 == 0) {
          this.mosse.push([])
          this.mosse[this.mosse.length - 1].push(cont / 2 + 1 + "");
        }
        if(AddPartitaComponent.game.getComments().some(element => element.fen === mossa.after))
          this.mosse[this.mosse.length - 1].push(mossa.san + "*");
        else
          this.mosse[this.mosse.length - 1].push(mossa.san);
        cont++;
      });
    }

    // Funzioni per la board di chessboard.js: Quando un pezzo viene toccato, mostro le mosse possibili
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

    // Funzioni per la board di chessboard.js: Quando un pezzo viene mosso, aggiorno la board
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

    // Funzioni di servizio per capire se un pezzo è bianco o nero
    static isWhitePiece (piece : string) : boolean { return /^w/.test(piece); }
    static isBlackPiece (piece : string) : boolean{ return /^b/.test(piece); }

    // Funzione di servizio per la libreria di chessboard che serve per aggiornare lo stato interno della partita
    static updateStatus () : void{
      let esito = '0';

      if (AddPartitaComponent.game.isCheckmate() && AddPartitaComponent.game.turn() == 'w') {
        esito = '2';
      } else if (AddPartitaComponent.game.isCheckmate() && AddPartitaComponent.game.turn() == 'b') {
        esito = '1';
      } else if (AddPartitaComponent.game.isDraw()) {
        esito = '3';
      }
      AddPartitaComponent.gameState = esito;
    }

    // Annulla l'ultima mossa fatta e aggiorna la pagina con la mossa precedente
    undoMove(): void {
      AddPartitaComponent.game.undo();
      AddPartitaComponent.board.fen(AddPartitaComponent.game.fen());
      this.risultato = "0";
      this.positionEnded = false;
      AddPartitaComponent.updateStatus();
      this.commentoAttuale = AddPartitaComponent.game.getComment();
    }

    // Salva il commento della mossa attuale
    salvaCommento(): void {
      if (this.commentoAttuale == "")
        return;
      AddPartitaComponent.game.setComment(this.commentoAttuale);
      AddPartitaComponent.updateStatus();
    }

    // Cancella il commento della mossa attuale
    cancellaCommento(): void {
      this.commentoAttuale = "";
      AddPartitaComponent.game.deleteComment();
      AddPartitaComponent.updateStatus();
    }

    // Genero i dati del PGN
    generaPGN(): void {
      if(this.partita?.torneo?.nome != null && this.partita?.torneo?.nome != "")
        AddPartitaComponent.game.header('Event', this.partita.torneo.nome + "");
      if(this.partita?.torneo?.luogo != null && this.partita?.torneo?.luogo != "")
        AddPartitaComponent.game.header('Site', this.partita.torneo.luogo + "");
      if(this.partita?.torneo?.dataInizio != null && this.partita?.torneo?.dataInizio + "" != "")
        AddPartitaComponent.game.header('Date', this.partita.torneo.dataInizio.getDate().toString() + "");
      if(this.partita?.turno != null && this.partita?.turno + "" != "")
        AddPartitaComponent.game.header('Round', this.partita?.turno + "");
      let result = "";
      if(this.risultato == "1")
        result = "1-0";
      else if(this.risultato == "2")
        result = "0-1";
      else if(this.risultato == "3")
        result = "1/2-1/2";
      AddPartitaComponent.game.header('Result', result);
      if(this.partita?.giocatore1?.cognome != null && this.partita?.giocatore1?.cognome != "" && this.partita?.giocatore1?.nome != null && this.partita?.giocatore1?.nome != "")
        AddPartitaComponent.game.header('White', this.partita?.giocatore1?.cognome + "" + this.partita?.giocatore1.nome);
      if(this.partita?.giocatore2?.cognome != null && this.partita?.giocatore2?.cognome != "" && this.partita?.giocatore2?.nome != null && this.partita?.giocatore2?.nome != "")
        AddPartitaComponent.game.header('Black', this.partita?.giocatore2?.cognome + "" + this.partita?.giocatore2.nome);
      }

    // Mando la partita al backend per salvarla
    salvaPartita(): void {
      if(this.risultato == "0"){
        alert("Inserisci un risultato per salvare la partita");
        return;
      }
      this.generaPGN();
      AddPartitaComponent.updateStatus();
      if(this.partita == null)
        return;
      this.partita.pgn = AddPartitaComponent.game.pgn();
      this.partita.esito = this.risultato;
      this.partita.privacy = "pubblica";
      this.partitaService.salvaPartita(this.partita).subscribe(result=> {
        if(this.partita?.torneo?.id != null)
          this.router.navigate(['/torneo'], {queryParams: {torneoId: this.partita?.torneo?.id}});
        else
          this.router.navigate(['/partita'], {queryParams: {id: this.partita?.id}});
        }
      );
    }

    // Carica un PGN da file
    importa(event: any) : void {
      let File = event.target.files[0];
      if(File)
        this.readFile(File);
    }

    // Legge il file e lo carica nella board
    readFile(file: File) {
      let fileReader = new FileReader();

      fileReader.onload = (e) => {
        let fileContent = fileReader.result as string;
        AddPartitaComponent.game.loadPgn(fileContent);
        AddPartitaComponent.board.fen(AddPartitaComponent.game.fen());
        AddPartitaComponent.updateStatus();
      };

      fileReader.readAsText(file);
    }

    // Scarica il PGN della partita
    scaricaPGN(): void {
      this.generaPGN();
      let textContent = AddPartitaComponent.game.pgn();
      let blob = new Blob([textContent], { type: 'text/plain' });
      let url = window.URL.createObjectURL(blob);

      let a = document.createElement('a');
      a.href = url;
      a.download = "partita.txt";
      document.body.appendChild(a);
      a.click();


      window.URL.revokeObjectURL(url);
    }

}
