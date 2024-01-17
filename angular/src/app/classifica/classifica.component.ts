import { Component, Input, OnInit} from '@angular/core';
import { Utente } from '../model/utente';
import { UtentiService } from '../services/utenti.service';
import {NavigationEnd, Router} from "@angular/router";
import {AuthServiceService} from "../services/auth.service";


@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.component.html',
  styleUrl: './classifica.component.css'
})
export class ClassificaComponent implements OnInit{
  @Input()utentiMigliori?:Utente[]
  @Input()utentiMiglioriSettimana?:Utente[]
  @Input()utentiMiglioriVisualizzati?:Utente[]
  @Input()utentiMiglioriSettimanaVisualizzati?:Utente[]
  visualizzaMigliori:boolean=true;
  visualizzaSettimana:boolean=true;
  testo?:string;
  usernameUtente?:string;
  indice:number=0;
  indiceWeek:number=0;
  visualizzaBottone=true;

  ngOnInit(){
    this.cercaUtente();
    this.getBestUser();
    this.cercaPosizione();
    this.testo="Visualizza classifica completa";
    this.visualizzaBottone=true;

  }
  constructor(private utentiService:UtentiService, private router:Router){}

  private getBestUser() {
    this.utentiService.dammiUtenti().subscribe(user => {
      this.utentiMigliori = user.slice().sort((a: Utente, b: Utente) => b.punteggio - a.punteggio)
      this.utentiMiglioriSettimana = user.slice().sort((a: Utente, b: Utente) => b.punteggioSettimanale - a.punteggioSettimanale)
      this.utentiMiglioriVisualizzati=this.utentiMigliori?.slice(0, 10);
      this.utentiMiglioriSettimanaVisualizzati=this.utentiMiglioriSettimana?.slice(0, 10);
    });
  }

  load() {
    if(this.testo=="Visualizza classifica completa") {
      this.testo = "Carica Altri";
      this.visualizzaSettimana = false;
    }
    var length=this.utentiMiglioriVisualizzati?.length;
    if(length!=undefined) {
      length += 10;
      if (length >= this.utentiMigliori!.length)
        this.visualizzaBottone = false;
    }
    this.utentiMiglioriVisualizzati=this.utentiMigliori?.slice(0, length);
  }

  loadWeek(){
      if(this.testo=="Visualizza classifica completa") {
        this.testo = "Carica Altri";
        this.visualizzaMigliori = false;
      }
      var length=this.utentiMiglioriSettimanaVisualizzati?.length;
      if(length!=undefined) {
        length += 10;
        if (length >= this.utentiMigliori!.length)
          this.visualizzaBottone = false;
      }
      this.utentiMiglioriSettimanaVisualizzati=this.utentiMiglioriSettimana?.slice(0, length);
  }

  cercaUtente(): any | undefined {
      this.utentiService.dammiUtenteAcceduto().subscribe(utenteAcceduto=> {
        if(utenteAcceduto!=undefined)
          this.usernameUtente = utenteAcceduto.username;
      });
  }

  cercaPosizione(){
    if(this.utentiMigliori!=undefined){
      for (let i = 0; i < this.utentiMigliori.length; i++) {
        if(this.utentiMigliori[i].username==this.usernameUtente){
          this.indice=i+1;
        }
      }
    }
    if(this.utentiMiglioriSettimana!=undefined){
      for (let i = 0; i < this.utentiMiglioriSettimana.length; i++) {
        if(this.utentiMiglioriSettimana[i].username==this.usernameUtente){
          this.indiceWeek=i+1;
        }
      }
    }
  }
  visualizzaUtente(user: Utente) {
    if(this.usernameUtente!=undefined&&user.username==this.usernameUtente)
      this.router.navigate(['/profilo']);
    else
      this.router.navigate(['/profiloPubblico'], {queryParams: {username: user.username}});
  }
}
