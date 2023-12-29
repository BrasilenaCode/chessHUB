import { Component, Input } from '@angular/core';
import { Torneo } from '../model/torneo';

@Component({
  selector: 'app-torneo-show',
  templateUrl: './torneo-show.component.html',
  styleUrl: './torneo-show.component.css'
})
export class TorneoShowComponent {
  @Input() torneo?: Torneo;
  @Input() torneoConcluso?: Torneo;
}
