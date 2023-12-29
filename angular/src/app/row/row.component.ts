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
  @Input()utenteAcceduto?:string;
  condizione?:boolean;


  ngOnInit(){
    this.condizione=this.utenteAcceduto==this.utente?.username;
  }
}
