import { Component, OnInit } from '@angular/core';
import { PartitaService } from '../services/partita.service';
import { Partita } from '../model/partita';
import { Utente } from '../model/utente';
import { ActivatedRoute } from '@angular/router';
import { Chess } from 'chess.js';

declare var Chessboard2: any;

@Component({
  selector: 'app-partita',
  templateUrl: './partita.component.html',
  styleUrl: './partita.component.css'
})
export class PartitaComponent implements OnInit{
  game: Chess = new Chess();
  board?: any;
  partita?: Partita;
  infoPartita: {[key: string]: string} = {};
  nAttuale: number = 0;
  mosse: string[][] = [];
  fenHistory: string[] = [];
  commentoAttuale: string = "";
  automatic : boolean = false;
  clock? : NodeJS.Timeout

  comments : {[key: string]: string} = {};

  constructor(private partitaService : PartitaService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.partitaService.dammiPartita(parseInt(this.activatedRoute.snapshot.queryParams['id'])).subscribe(partita => this.partita = partita)
    try{
      this.board = Chessboard2('board', 'start');
    }
    catch(e){}
    setTimeout(() => {
      this.caricamentoPartita();
    }, 1000);
  }

  caricamentoPartita(): void {
    if (this.partita == null) {
      return;
    }
    this.game.loadPgn(this.partita.pgn);
    let cont : number = 0;
    this.mosse = [];
    this.game.history().forEach(mossa => {
      if (cont % 2 == 0) {
        this.mosse.push([])
        this.mosse[this.mosse.length - 1].push(cont / 2 + 1 + "");
      }
      this.mosse[this.mosse.length - 1].push(mossa);
      cont++;
    });
    this.fenHistory = this.game.history({ verbose: true }).map((move) => move.after);
    this.fenHistory.unshift(this.board.fen());
    this.game.getComments().forEach((comment) => {
      this.comments[comment.fen] = comment.comment;
    });
  }

  nextMove(): void {
    if (this.nAttuale < this.fenHistory.length - 1) {
      this.nAttuale++;
      this.board.position(this.fenHistory[this.nAttuale]);
      this.commentoAttuale = this.comments[this.fenHistory[this.nAttuale]];
    }
  }

  previousMove(): void {
    if (this.nAttuale > 0) {
      this.nAttuale--;
      this.board.position(this.fenHistory[this.nAttuale]);
      this.commentoAttuale = this.comments[this.fenHistory[this.nAttuale]];
    }
  }

  goTo(mossa: string, colore : number): void {
    let mossaN = parseInt(mossa) * 2 - 2 + colore + 1;
    if (mossaN >= 0 && mossaN < this.fenHistory.length) {
      this.nAttuale = mossaN;
      this.board.position(this.fenHistory[this.nAttuale]);
      this.commentoAttuale = this.comments[this.fenHistory[this.nAttuale]];
    }
  }

  auto() : void {
    this.automatic = !this.automatic;
    if (this.automatic) {
      document.getElementById("automode")!.innerHTML = "ON";
      this.clock = setInterval(() => this.nextMove(), 1000);
    }
    else{
      document.getElementById("automode")!.innerHTML = "OFF";
      clearInterval(this.clock);
    }

  }
}
