import { Component, Input } from '@angular/core';
import { Torneo } from '../model/torneo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-torneo-show',
  templateUrl: './torneo-show.component.html',
  styleUrl: './torneo-show.component.css'
})
export class TorneoShowComponent {
  @Input() torneo?: Torneo;
  constructor(private router: Router) {}
  vaiAlTorneo(): void{
    this.router.navigate(['/torneo'], {queryParams: {torneoId: this.torneo?.id}});
  }
}
