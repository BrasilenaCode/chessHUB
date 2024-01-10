import { Component, OnInit } from '@angular/core';
import { PartitaService } from '../services/partita.service';
import { Partita } from '../model/partita';
import { Utente } from '../model/utente';
import {ActivatedRoute, Router} from '@angular/router';
import { Chess } from 'chess.js';
import {UtentiService} from "../services/utenti.service";

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

  custom : boolean = false;
  selezioneInCorso : boolean = true;

  info : {[key: string]: string} = {
    "White": "Sconosciuto",
    "Black": "Sconosciuto",
    "Site": "",
    "Date": "",
    "Round": "",
    "Result": "NC",
    "Event": ""
  };

  comments : {[key: string]: string} = {};

  constructor(private partitaService : PartitaService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    try{
      this.board = Chessboard2('board', 'start');
    }
    catch(e){}
    if(this.activatedRoute.snapshot.queryParams['id'] == null){
      this.custom = true;
    }else{
      this.custom = false;
      this.partitaService.dammiPartita(parseInt(this.activatedRoute.snapshot.queryParams['id'])).subscribe(partita => {
        this.partita = partita;
      });
      setTimeout(() => {
        this.caricamentoPartita(this.partita!.pgn);
        this.caricaDati();
      }, 1000);
    }
  }

  caricamentoPartita(pgn : string): void {
    this.game.loadPgn(pgn);
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
    this.fenHistory.unshift(this.board?.fen());
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

  caricaDatiCustom() : void {
    if(this.game.header()["White"] != undefined)
      this.info["White"] = this.game.header()["White"];

    if(this.game.header()["Black"] != undefined)
      this.info["Black"] = this.game.header()["Black"];

    if(this.game.header()["Site"] != undefined)
      this.info["Site"] = this.game.header()["Site"];

    if(this.game.header()["Date"] != undefined)
      this.info["Date"] = this.game.header()["Date"];

    if(this.game.header()["Round"] != undefined)
      this.info["Round"] = this.game.header()["Round"];

    if(this.game.header()["Result"] != undefined)
      this.info["Result"] = this.game.header()["Result"];

    if(this.game.header()["Event"] != undefined)
      this.info["Event"] = this.game.header()["Event"];
  }

  caricaDati(){
    if(this.partita == null)
      return;

    if(this.partita.giocatore1.username == "custom")
      if(this.game.header()["White"] != undefined)
        this.info["White"] = this.game.header()["White"]
    else
      this.info["White"] = this.partita.giocatore1.nome + " " + this.partita.giocatore1.cognome;

    if(this.partita.giocatore2.username == "custom")
      if(this.game.header()["Black"] != undefined)
        this.info["Black"] = this.game.header()["Black"]
    else
      this.info["Black"] = this.partita.giocatore2.nome + " " + this.partita.giocatore2.cognome;

    if(this.partita.turno != undefined)
      this.info["Round"] = this.partita.turno + " ";
    else if (this.game.header()["Round"] != undefined)
      this.info["Round"] = this.game.header()["Round"];

    if(this.partita.torneo.id == -1){
      if(this.game.header()["Site"] != undefined)
        this.info["Site"] = this.game.header()["Site"]
      if(this.game.header()["Event"] != undefined)
        this.info["Event"] = this.game.header()["Event"]
      }
    else{
      this.info["Event"] = this.partita.torneo.nome;
      this.info["Site"] = this.partita.torneo.luogo;
    }

    if(this.partita.data != undefined)
      this.info["Date"] = this.partita.data.toString();
    else if(this.game.header()["Date"] != undefined)
      this.info["Date"] = this.game.header()["Date"];

    if(this.partita.esito != undefined){
      switch(this.partita.esito){
        case "1":
          this.info["Result"] = "1-0";
          break;
        case "2":
          this.info["Result"] = "0-1";
          break;
        case "3":
          this.info["Result"] = "1/2-1/2";
          break;
      }

    }
    else if(this.game.header()["Result"] != undefined)
      this.info["Result"] = this.game.header()["Result"];
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
      this.caricamentoPartita(fileContent);
      this.caricaDatiCustom();
    };

    fileReader.readAsText(file);
    this.selezioneInCorso = false;
  }
}
