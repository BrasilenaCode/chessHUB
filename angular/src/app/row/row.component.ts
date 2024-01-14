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
  @Input()punteggi?:Map<string, number>;
  @Input()utenteAcceduto?:string;
  condizione?:boolean;
  condizioneClassifica:boolean=false;


  ngOnInit(){
    this.condizione=this.utenteAcceduto==this.utente?.username;
    if(this.punteggi!=undefined)
      this.condizioneClassifica=true;
  }
}
