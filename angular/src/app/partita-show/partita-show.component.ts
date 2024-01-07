import {Component, Input, OnInit} from '@angular/core';
import {Partita} from "../model/partita";
import {Router} from "@angular/router";
import {UtentiService} from "../services/utenti.service";
import {AuthServiceService} from "../services/auth.service";
import { NgModel } from '@angular/forms';
import { PartitaService } from '../services/partita.service';

@Component({
  selector: 'app-partita-show',
  templateUrl: './partita-show.component.html',
  styleUrl: './partita-show.component.css'
})
export class PartitaShowComponent implements OnInit{
  @Input() partita?: Partita;
  privacy?:boolean;
  admin?:boolean;
  white : string = "";
  black : string = "";
  modifica : boolean = true;

  risultato : string = "";

  constructor(private router: Router, private utenteService:UtentiService, private auth:AuthServiceService, private partitaService:PartitaService){}

  ngOnInit(): void {
    this.setNomePartita();
    this.setPrivacy();
  }
  setNomePartita(): void {
    let giocatore1: string | undefined = this.partita?.giocatore1?.username;
    if (giocatore1 == undefined)
      this.white = "Giocatore1";
    else{
      this.white = giocatore1;
    }
    let giocatore2: string | undefined = this.partita?.giocatore2?.username;
    if (giocatore2 == undefined)
      this.black = "Giocatore2";
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
      this.risultato = "   ";
    }
  }

  salvaPartita(): void {
    console.log(this.partita?.esito);
    if (this.partita != undefined){
      console.log(this.partita);
      this.partitaService.salvaPartita(this.partita).subscribe();
    }
  }

  caricaPartita(): void {
    this.router.navigate(['/addPartita'], {queryParams: {id: this.partita?.id}});
  }

  visualizzaPartita(): void {
    this.router.navigate(['/partita'], {queryParams: {id: this.partita?.id}});
  }

  salvaEsito(): void {
    console.log(this.partita?.esito);
  }

  private setPrivacy() {
    this.privacy = false;
    this.admin = false;
    this.auth.isAdmin().subscribe(risultato=>{
      console.log(risultato)
      if (risultato){
        this.privacy = true;
        this.admin = true;
      } else {
        if (this.partita?.privacy == "pubblica")
          this.privacy = true;
        else {
          if (this.partita?.privacy!="privata" && (this.utenteService.verificaSeSeguiUtente(this.partita?.giocatore1?.username!) || (this.utenteService.verificaSeSeguiUtente(this.partita?.giocatore2?.username!)))) {
            this.privacy = true;
          }
        }
      }
    });
  }
}
