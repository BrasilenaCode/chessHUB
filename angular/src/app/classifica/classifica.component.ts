import { Component, Inject, Input, OnInit} from '@angular/core';
import { Utente } from '../model/utente';
import { UtentiService } from '../services/utenti.service';


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

    ngOnInit(){
      this.cercaUtente();
      this.getBestUser();
      this.cercaPosizione();
      this.testo="Visualizza classifica completa";
    }
    constructor(private utentiService:UtentiService){}
    getUtenti(){
        this.utentiService.dammiUtenti().subscribe(user=> this.utentiMigliori=user);

    }
    getUtente(username:string){
      this.utentiService.getUtente(username);
    }
    updateUtente(){
      const utente = {
        nome: "Filippo",
        cognome: "Filiberto",
        nazionalita: "spagnolo",
        dataNascita: new Date(),
        username: "filo",
        password: "lala",
        punteggio: 12,
        punteggioSettimanale: 12
      }
      this.utentiService.updateUtente(utente)
    }


    deleteUtente(){
      const utente = {
        nome: "Filippo",
        cognome: "Filiberto",
        nazionalita: "italiano",
        dataNascita: new Date(),
        username: "filo",
        password: "lala",
        punteggio: 12,
        punteggioSettimanale: 12
      }
      this.utentiService.deleteUtente(utente)
    }
    addUtente(){
      const utente = {
        nome: "Filippo",
        cognome: "Filiberto",
        nazionalita: "italiano",
        dataNascita: new Date(),
        username: "filo",
        password: "lala",
        punteggio: 12,
        punteggioSettimanale: 12
      }
      this.utentiService.aggiungiUtente(utente)
    }

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
    if(length!=undefined)
      length+=10;
    this.utentiMiglioriVisualizzati=this.utentiMigliori?.slice(0, length);
  }

  loadWeek(){
      if(this.testo=="Visualizza classifica completa") {
        this.testo = "Carica Altri";
        this.visualizzaMigliori = false;
      }
      var length=this.utentiMiglioriSettimanaVisualizzati?.length;
      if(length!=undefined)
        length+=10;
      this.utentiMiglioriSettimanaVisualizzati=this.utentiMiglioriSettimana?.slice(0, length);
  }

  cercaUtente(): any | undefined {
      this.utentiService.dammiUtenteAcceduto().subscribe(utenteAcceduto=> {
        this.usernameUtente = utenteAcceduto.username;
      });
  }

  cercaPosizione(){
    if(this.utentiMigliori!=undefined){
      for (let i = 0; i < this.utentiMigliori.length; i++) {
        if(this.utentiMigliori[i].username==this.usernameUtente){
          this.usernameUtente=this.usernameUtente;
          this.indice=i+1;
          console.log(this.indice)
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

}
