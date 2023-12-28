import { Component, Input } from '@angular/core';
import { Utente } from '../model/utente';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrl: './row.component.css'
})
export class RowComponent {
  @Input()utente?:Utente;
  @Input()index?:number;
}
