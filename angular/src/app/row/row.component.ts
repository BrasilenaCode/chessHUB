import {Component, Input, OnInit} from '@angular/core';
import { Utente } from '../model/utente';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrl: './row.component.css'
})
export class RowComponent implements OnInit{
  @Input()utente?:Utente;
  @Input()index?:number;
  @Input()settimanale=false;
  @Input()punteggi?:Map<string, number>;
  @Input()utenteAcceduto?:string;
  @Input()actualCustom?:number;
  condizione?:boolean;
  condizioneClassifica:boolean=false;
  punti?:number;


  ngOnInit(){
    //condizione per verificare se l'utente visualizzato è l'utente acceduto
    this.condizione=this.utenteAcceduto==this.utente?.username;
    //condizione per far visualizzare i punteggi relativi al torneo o alla classifica generale
    if(this.punteggi!=undefined) {
      this.condizioneClassifica = true;
      this.punti= this.punteggi?.get(this.utente!.username);
    }
    //caso in cui l'utente è stato eliminato
    if(this.utente?.username=="custom"){
      this.utente.username="eliminato"
      this.utente.nazionalita="";
      this.punti=this.punteggi?.get("custom_"+this.actualCustom);
    }
  }
}
