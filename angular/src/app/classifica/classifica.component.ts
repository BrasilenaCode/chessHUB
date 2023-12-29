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

    ngOnInit(){
      this.getBestUser();
    }
    constructor(private utentiService:UtentiService){}
    getUtenti(){
        this.utentiService.dammiUtenti().subscribe(user=> this.utentiMigliori=user);

    }
    getUtente(username:string){
      this.utentiService.getUtente(username).subscribe((risposta)=>{
        console.log(risposta.cognome);    })
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
    });
  }
}
