import {Component, Input} from '@angular/core';
import {Partita} from "../model/partita";

@Component({
  selector: 'app-partita-show',
  templateUrl: './partita-show.component.html',
  styleUrl: './partita-show.component.css'
})
export class PartitaShowComponent {
  @Input() partita?: Partita;
}
