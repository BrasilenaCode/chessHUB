import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { PartitaService } from '../services/partita.service';
import { Partita } from '../model/partita';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Chess } from 'chess.js';
import {UtentiService} from "../services/utenti.service";
import { AuthServiceService } from '../services/auth.service';
import {isPlatformBrowser} from "@angular/common";

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
  n: number = 0;
  mosse: string[][] = [[]];
  fenHistory: string[] = [];
  commentoAttuale: string = "";
  automatic : boolean = false;
  clock? : NodeJS.Timeout;
  errorePGN = "";
  locked : boolean = true;
  proprietario : boolean = false;
  admin : boolean = false;
  custom : boolean = false;
  selezioneInCorso : boolean = true;

  info : {[key: string]: string} = {
    "White": "Sconosciuto",
    "Black": "Sconosciuto",
    "Site": "Sconosciuto",
    "Date": "Non Presente",
    "Round": "0",
    "Result": "",
    "Event": "Personalizzato"
  };

  comments : {[key: string]: string} = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private partitaService : PartitaService, private activatedRoute: ActivatedRoute, private authService : AuthServiceService, private utentiService : UtentiService, private router : Router){}
  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event && event.routerEvent instanceof NavigationEnd && isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    });
    try{
      this.board = Chessboard2('board1', 'start');
    }
    catch(e){}
    if(this.activatedRoute.snapshot.queryParams['id'] == null){
      this.custom = true;
    }else{
      this.custom = false;
      this.partitaService.dammiPartita(parseInt(this.activatedRoute.snapshot.queryParams['id'])).subscribe(partita => {
        if(partita == null){
          this.router.navigate(['/page404']);
          return;
        }
        this.partita = partita;
        if(this.authService.isAuthenticated()){
          this.authService.isAdmin().subscribe(admin => this.admin = admin);
          this.utentiService.dammiUtenteAcceduto().subscribe(utente => {
            if(utente.username == this.partita?.giocatore1.username || utente.username == this.partita?.giocatore2.username)
              if(this.partita?.torneo.id == -1)
                this.proprietario = true;
          });
        }
        if(this.partita?.torneo.stato != "passato" || this.partita?.torneo.id == -1)
          this.locked = false;
        if(this.partita.id == -1)
          this.locked = true;
        this.caricamentoPartita(this.partita?.pgn);
        this.caricaDati();
      });
    }
  }

  caricamentoPartita(pgn : string | undefined): void {
    if(pgn == undefined){
      this.errorePGN = "File non inserito";
      return;
    }
    try{
      this.game.loadPgn(pgn);
    }catch(e){
      this.errorePGN = "File non valido";
      return;
    }
    this.game.getComments().forEach((comment) => {
      this.comments[comment.fen] = comment.comment;
    });
    let cont : number = 0;
    this.mosse = [];
    this.game.history({verbose : true}).forEach(mossa => {
      if (cont % 2 == 0) {
        this.mosse.push([])
        this.mosse[this.mosse.length - 1].push(cont / 2 + 1 + "");
      }
      if(this.comments[mossa.after] != undefined)
        this.mosse[this.mosse.length - 1].push(mossa.san + "*");
      else
        this.mosse[this.mosse.length - 1].push(mossa.san);
      cont++;
    });
    this.fenHistory = this.game.history({ verbose: true }).map((move) => move.after);
    this.fenHistory.unshift(this.board?.fen());
    this.errorePGN = "";
  }

  nextMove(): void {
    if (this.nAttuale < this.fenHistory.length - 1) {
      this.nAttuale++;
      this.n = Math.floor((this.nAttuale + 1) / 2);
      this.board.position(this.fenHistory[this.nAttuale]);
      this.commentoAttuale = this.comments[this.fenHistory[this.nAttuale]];
    }
  }

  previousMove(): void {
    if (this.nAttuale > 0) {
      this.nAttuale--;
      this.n = Math.floor((this.nAttuale + 1) / 2);
      this.board.position(this.fenHistory[this.nAttuale]);
      this.commentoAttuale = this.comments[this.fenHistory[this.nAttuale]];
    }
  }

  goTo(mossa: string, colore : number): void {
    let mossaN = parseInt(mossa) * 2 - 2 + colore + 1;
    if (mossaN >= 0 && mossaN < this.fenHistory.length) {
      this.nAttuale = mossaN;
      this.n = Math.floor((this.nAttuale + 1) / 2);
      this.board.position(this.fenHistory[this.nAttuale]);
      this.commentoAttuale = this.comments[this.fenHistory[this.nAttuale]];
    }
  }

  auto() : void {
    this.automatic = !this.automatic;
    if (this.automatic) {
      document.getElementById("automode")!.innerHTML = "OFF";
      this.clock = setInterval(() => this.nextMove(), 1000);
    }
    else{
      document.getElementById("automode")!.innerHTML = "ON";
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

    if(this.partita.giocatore1.username != "custom")
      this.info["White"] = this.partita.giocatore1.nome + " " + this.partita.giocatore1.cognome;
    else if(this.game.header()["White"] != undefined)
      this.info["White"] = this.game.header()["White"];


    if(this.partita.giocatore2.username != "custom")
      this.info["Black"] = this.partita.giocatore2.nome + " " + this.partita.giocatore2.cognome;
    else if(this.game.header()["Black"] != undefined)
      this.info["Black"] = this.game.header()["Black"];


    if(this.partita.turno != undefined)
      this.info["Round"] = this.partita.turno + " ";
    else if (this.game.header()["Round"] != undefined)
      this.info["Round"] = this.game.header()["Round"];

    if(this.partita.torneo.id == -1){
      if(this.game.header()["Site"] != undefined)
        this.info["Site"] = this.game.header()["Site"];
      if(this.game.header()["Event"] != undefined)
        this.info["Event"] = this.game.header()["Event"];
      }
    else{
      this.info["Event"] = this.partita.torneo.nome;
      this.info["Site"] = this.partita.torneo.luogo;
    }

    if(this.partita.data != undefined)
      this.info["Date"] = this.partita.data.toString().substring(8, 10) + "/" + this.partita.data.toString().substring(5, 7) + "/" + this.partita.data.toString().substring(0, 4);
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
      if (this.errorePGN != "")
        return;
      this.caricaDatiCustom();
      this.selezioneInCorso = false;
    };

    fileReader.readAsText(file);
  }

  modifica() : void {
    this.router.navigate(['/addPartita'], {queryParams: {id: this.partita?.id}});
  }

  elimina() : void {
    if(this.partita?.torneo.id != -1)
      alert("Non puoi eliminare la partita di un torneo");
    else{
      if(confirm("Sei sicuro di voler eliminare la partita?")){
        this.partitaService.eliminaPartita(this.partita?.id!).subscribe((response) => {
          if(response){
            alert("Partita eliminata con successo");
            this.router.navigate(['/']);
          }
          else
            alert("Errore nell'eliminazione della partita");
        });
      }
    }
  }
}
