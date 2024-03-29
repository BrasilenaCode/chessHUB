import {Component, Input, OnInit} from '@angular/core';
import {Partita} from "../model/partita";
import {Router} from "@angular/router";
import {UtentiService} from "../services/utenti.service";
import {AuthServiceService} from "../services/auth.service";
import { NgModel } from '@angular/forms';
import { PartitaService } from '../services/partita.service';
import { Chess } from 'chess.js';


@Component({
  selector: 'app-partita-show',
  templateUrl: './partita-show.component.html',
  styleUrl: './partita-show.component.css'
})
export class PartitaShowComponent implements OnInit{
  @Input() partita?: Partita;
  @Input() seePrivacy = true;
  privacy?:boolean;
  admin?:boolean;
  white : string = "";
  black : string = "";

  risultato : string = "Da giocare";

  constructor(private router: Router, private utenteService:UtentiService, private auth:AuthServiceService, private partitaService:PartitaService){}

  ngOnInit(): void {
    this.setNomePartita();
    this.setPrivacy();
  }

  setNomePartita(): void {
    //setta i parametri per la visualizzazione della partita, se non è stata giocata tenta di prendere i nomi dal pgn se non ci riesce mette giocatore1 e giocatore2.
    //se la partita è stata giocata setta i nomi dei giocatori e il risultato
    let pgn = new Chess();
    let pgnLoaded = true;
    try{
      pgn.loadPgn(this.partita!.pgn);
    }catch(e){
      pgnLoaded = false;
    }
    let giocatore1: string | undefined = this.partita?.giocatore1?.username;
    if (giocatore1 == undefined || giocatore1 == "custom"){
      if(pgnLoaded && pgn.header()["White"] != undefined)
        this.white = pgn.header()["White"];
      else
        this.white = "Giocatore1";
    }
    else{
      this.white = giocatore1;
    }
    let giocatore2: string | undefined = this.partita?.giocatore2?.username;
    if (giocatore2 == undefined || giocatore2 == "custom"){
      if(pgnLoaded && pgn.header()["Black"] != undefined)
        this.black = pgn.header()["Black"];
      else
        this.black = "Giocatore2";
    }
    else{
      this.black = giocatore2;
    }
    if(this.partita?.esito == "1"){
      this.risultato = "1-0";
    }else if(this.partita?.esito == "2"){
      this.risultato = "0-1";
    }
    else if(this.partita?.esito == "3"){
      this.risultato = "1/2";
    }
    else{
      this.risultato = "Da giocare";
    }
  }

  //se la partita è stata giocata e l'utente è admin o la partita è pubblica o l'utente segue uno dei due giocatori allora può visualizzare la partita
  visualizzaPartita(): void {
    if(this.admin && this.partita?.esito == "0")
      this.router.navigate(['/addPartita'], {queryParams: {id: this.partita?.id}});
    else if(this.privacy || this.admin)
      this.router.navigate(['/partita'], {queryParams: {id: this.partita?.id}});
    else
      alert("Non hai i permessi per visualizzare questa partita");
  }

  //imposta la visibilità, se l'utente è admin o la partita è pubblica o l'utente segue uno dei due giocatori allora può visualizzare la partita
  private setPrivacy() {
    this.privacy = false;
    this.admin = false;
    if(!this.auth.isAuthenticated()){
      if(this.partita?.privacy== "pubblica" && this.partita.esito != "0")
        this.privacy = true;
      else
        this.privacy = false;
      return;
    }
    this.utenteService.dammiUtenteAcceduto().subscribe(utente => {
      if(utente.username == this.partita?.giocatore1?.username || utente.username == this.partita?.giocatore2?.username)
        this.privacy = true;
      else {
        this.controllaSeAdmin();
      }

    });

  }
  private controllaSeAdmin() {
    this.auth.isAdmin().subscribe(risultato=>{
      if (risultato){
        this.privacy = true;
        this.admin = true;
      } else {
        if(this.risultato=="Da giocare")
          this.privacy=false;
        else if (this.partita?.privacy == "pubblica")
          this.privacy = true;
        else if (this.partita?.privacy=="amici"){
          this.utenteService.verificaSeSeguiUtente(this.partita?.giocatore1?.username!).subscribe(
            risultato => {
              if(risultato)
                this.privacy = true;
              else
                this.utenteService.verificaSeSeguiUtente(this.partita?.giocatore2?.username!).subscribe(
                  risultato => {
                    if(risultato)
                      this.privacy = true;
                  }
                );
            }
          );
        }
      }
    });
  }
}
