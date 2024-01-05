import {Component, Input, OnInit} from '@angular/core';
import {Partita} from "../model/partita";
import {Router} from "@angular/router";
import {UtentiService} from "../services/utenti.service";
import {AuthServiceService} from "../services/auth.service";

@Component({
  selector: 'app-partita-show',
  templateUrl: './partita-show.component.html',
  styleUrl: './partita-show.component.css'
})
export class PartitaShowComponent implements OnInit{
  @Input() partita?: Partita;
  nomePartita: string = " ciao ";
  privacy?:boolean;
  admin?:boolean;

  constructor(private router: Router, private utenteService:UtentiService, private auth:AuthServiceService){}

  ngOnInit(): void {
    this.setNomePartita();
    this.setPrivacy();
  }
  setNomePartita(): void {
    let giocatore1: string | undefined = this.partita?.giocatore1?.username;
    if (giocatore1 == undefined)
      giocatore1 = "Giocatore1";
    let giocatore2: string | undefined = this.partita?.giocatore2?.username;
    if (giocatore2 == undefined)
      giocatore2 = "Giocatore2";
    this.nomePartita = giocatore1 + " vs " + giocatore2;
  }

  caricaPartita(): void {
    this.router.navigate(['/addPartita'], {queryParams: {id: this.partita?.id}});
  }

  visualizzaPartita(): void {
    this.router.navigate(['/partita'], {queryParams: {id: this.partita?.id}});
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
