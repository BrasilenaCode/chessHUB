import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtentiService } from '../services/utenti.service';
import { TorneoService } from '../services/torneo.service';
import { Chess } from 'chess.js';
import { PartitaService } from '../services/partita.service';
import { Utente } from '../model/utente';
import { Torneo } from '../model/torneo';
import { Partita } from '../model/partita';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

declare var Chessboard2: any;

@Component({
  selector: 'app-crea-pgn',
  templateUrl: './crea-pgn.component.html',
  styleUrl: './crea-pgn.component.css'
})
export class CreaPgnComponent implements OnInit{
  static game: Chess = new Chess();
  static board?: any;
  en? : Utente;
  me? : Utente;
  customTorneo? : Torneo;


  config = {
    draggable: true,
    position: 'start',
    onDragStart: this.onDragStart,
    onDrop: this.onDrop,
  }

  static gameState: string = "0";

  colore : string = "bianco";
  risultato : string= "0";
  visibilita : string = "";
  io : string = "";
  appartieneTorneo : string = "0";
  avversario : string = "";
  nomeTorneo : string = "";
  dataTorneo : any;
  luogoTorneo : string = "";
  turno : number = 0;
  guest : boolean = false;

  commentoAttuale : string = "";
  fenAttuale : string = "";

  mosse : string[][] = [];
  positionEnded : boolean = false;

  constructor(private utentiService : UtentiService, private activatedRoute: ActivatedRoute,
     private torneoService: TorneoService, private partitaService : PartitaService, private router: Router) {}

  // Carica la board e se l'utente è loggato carica le informazioni sulla partita per poter salvare la partita
  ngOnInit(): void {
    try{
      CreaPgnComponent.board = Chessboard2('board', this.config);
    }catch(e){}
    try{
      window.setInterval(() => {
        this.updateStats();
      }, 60);
    }catch(e){}

    if(this.activatedRoute.snapshot.queryParams['username'] == undefined){
      this.guest = true;
      return;
    }

    this.utentiService.dammiUtente(this.activatedRoute.snapshot.queryParams['username']).subscribe(utente => {
      this.me = utente;
      this.io = this.me.cognome + " " + this.me.nome;
    });

    this.utentiService.dammiUtente("custom").subscribe(utente => {
      this.en = utente;
    });

    this.torneoService.dammiTorneo(-1).subscribe(torneo => {
      this.customTorneo = torneo;
    });
  }

  // Salva il commento della posizione attuale
  salvaCommento(): void {
    if (this.commentoAttuale == "")
      return;
    CreaPgnComponent.game.setComment(this.commentoAttuale);
    CreaPgnComponent.updateStatus();
    this.updateFormulario();
  }

  // Cancella il commento della posizione attuale
  cancellaCommento(): void {
    this.commentoAttuale = "";
    CreaPgnComponent.game.deleteComment();
    CreaPgnComponent.updateStatus();
    this.updateFormulario();
  }

  // Annullo l'ultima mossa fatta e aggiorno le informazioni sulla pagina
  undoMove(): void {
    CreaPgnComponent.game.undo();
    CreaPgnComponent.board.position(CreaPgnComponent.game.fen());
    CreaPgnComponent.updateStatus();
  }

  // Scarica il file pgn della partita
  scaricaPGN(): void {
    this.generaPGN();
    const textContent = CreaPgnComponent.game.pgn();
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    // Crea un elemento "a" per simulare il download del file
    const a = document.createElement('a');
    a.href = url;
    a.download = "partita.txt";
    document.body.appendChild(a);
    a.click();

    // Rilascia l'URL dell'oggetto Blob
    window.URL.revokeObjectURL(url);
  }

  // Genera l'header del file pgn
  generaPGN(): void {
    if(this.appartieneTorneo == "1"){
      if(this.nomeTorneo != "")
        CreaPgnComponent.game.header('Event', this.nomeTorneo);
      if(this.luogoTorneo != "")
        CreaPgnComponent.game.header('Site', this.luogoTorneo);
      if(this.dataTorneo != null)
        CreaPgnComponent.game.header('Date', this.dataTorneo.toString());
      if(this.turno != 0)
        CreaPgnComponent.game.header('Round', this.turno.toString());
    }
    let result = "";
    if(this.risultato == "1")
      result = "1-0";
    else if(this.risultato == "2")
      result = "0-1";
    else if(this.risultato == "3")
      result = "1/2-1/2";
    if(result != "")
      CreaPgnComponent.game.header('Result', result);
    if(this.colore == "bianco"){
      if(this.io != "")
        CreaPgnComponent.game.header('White', this.io);
      if(this.avversario != "")
        CreaPgnComponent.game.header('Black', this.avversario);
    }else{
      if(this.avversario != "")
        CreaPgnComponent.game.header('White', this.avversario);
      if(this.io != "")
        CreaPgnComponent.game.header('Black', this.io);
    }
  }

  // Salva la partita nel database
  salvaPartita(): void {
    if(this.risultato == "0"){
      alert("Inserisci un risultato per salvare la partita");
      return;
    }

    if(this.visibilita=="") {
      alert("Inserisci la visibilità della partita");
      return;
    }

    if(this.mosse.length == 0){
      alert("Non è possibile salvare una partita senza mosse");
      return;
    }

    this.generaPGN();
    if(this.me == null || this.en == null || this.customTorneo == null){
      alert("Errore interno");
      return;
    }

    let partita : Partita;
    if(this.colore == "bianco"){
      partita = {
        id: 0,
        giocatore1: this.me,
        giocatore2: this.en,
        data: new Date(),
        torneo: this.customTorneo,
        turno: this.turno,
        esito: this.risultato,
        pgn: CreaPgnComponent.game.pgn(),
        privacy: this.visibilita
      }
    }
    else{
      partita = {
        id: 0,
        giocatore1: this.en,
        giocatore2: this.me,
        data: new Date(),
        torneo: this.customTorneo,
        turno: this.turno,
        esito: this.risultato,
        pgn: CreaPgnComponent.game.pgn(),
        privacy: this.visibilita
      }
    }
    this.partitaService.salvaPartita(partita).subscribe(((id) => {
      this.router.navigate(['/partita'], {queryParams: {id: id}});
    }));
  }

  // Aggiorna le informazioni sulla pagina
  updateStats(): void {
    if(this.fenAttuale == CreaPgnComponent.game.fen())
      return;
    this.fenAttuale = CreaPgnComponent.game.fen();
    if(this.commentoAttuale != CreaPgnComponent.game.getComment())
      this.commentoAttuale = CreaPgnComponent.game.getComment();
    if(CreaPgnComponent.gameState != "0"){
      this.risultato = CreaPgnComponent.gameState;
      this.positionEnded = true;
    }else{
      this.positionEnded = false;
    }
    this.updateFormulario();
  }

  // Aggiorna il formulario delle mosse
  updateFormulario(): void {
    this.mosse = [];
    let cont : number = 0;
    CreaPgnComponent.game.history({verbose : true}).forEach(mossa => {
      if (cont % 2 == 0) {
        this.mosse.push([])
        this.mosse[this.mosse.length - 1].push(cont / 2 + 1 + "");
      }
      if(CreaPgnComponent.game.getComments().some(element => element.fen === mossa.after))
        this.mosse[this.mosse.length - 1].push(mossa.san + "*");
      else
        this.mosse[this.mosse.length - 1].push(mossa.san);
      cont++;
    });
  }

  // Funzioni di servizio della board per capire se un pezzo è bianco o nero
  static isWhitePiece(piece : String): boolean {return piece.search(/^w/) !== -1}
  static isBlackPiece(piece : String): boolean {return piece.search(/^b/) !== -1}

  // Funzioni per la board di chessboard.js: Quando un pezzo viene rilasciato, aggiorno la board
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

  // Funzioni per la board di chessboard.js: Quando un pezzo viene toccato, mostro le mosse possibili
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

  // Funzione per la board: Aggirno lo stato interno della partita
  static updateStatus(): void {
    let esito = '0';

    if (CreaPgnComponent.game.isCheckmate() && CreaPgnComponent.game.turn() == 'w') {
      esito = '2';
    } else if (CreaPgnComponent.game.isCheckmate() && CreaPgnComponent.game.turn() == 'b') {
      esito = '1';
    } else if (CreaPgnComponent.game.isDraw()) {
      esito = '3';
    }
    CreaPgnComponent.gameState = esito;
  }

}
