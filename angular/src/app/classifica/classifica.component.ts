import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Utente } from '../model/utente';
import { UtentiService } from '../services/utenti.service';


@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.component.html',
  styleUrl: './classifica.component.css'
})
export class ClassificaComponent implements OnInit{
  @Input()utenti?:Utente[]
  @Input()utente?:Utente
  
    ngOnInit(){
      this.getUtenti();
    }
    constructor(private utentiService:UtentiService){}
    getUtenti(){
        this.utentiService.dammiUtenti().subscribe(user=> this.utenti=user, (risposta)=>{
          console.log(risposta.cognome)
        });
        
    }
    getUtente(username:string){
      this.utentiService.getUtente(username).subscribe((risposta)=>{
        console.log(risposta.cognome);    })
    }
    updateUtente(){
      this.utente = {
        nome: "Filippo",
        cognome: "Filiberto",
        nazionalita: "spagnolo",
        dataNascita: new Date(),
        username: "filo",
        password: "lala",
        punteggio: 12
      }
      this.utentiService.updateUtente(this.utente)
    }


    deleteUtente(){
      this.utente = {
        nome: "Filippo",
        cognome: "Filiberto",
        nazionalita: "italiano",
        dataNascita: new Date(),
        username: "filo",
        password: "lala",
        punteggio: 12
      }
      this.utentiService.deleteUtente(this.utente)
    }
    addUtente(){
      this.utente = {
        nome: "Filippo",
        cognome: "Filiberto",
        nazionalita: "italiano",
        dataNascita: new Date(),
        username: "filo",
        password: "lala",
        punteggio: 12
      }
      this.utentiService.aggiungiUtente(this.utente)
    }
}
