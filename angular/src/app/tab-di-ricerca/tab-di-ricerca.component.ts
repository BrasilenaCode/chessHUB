import { Component } from '@angular/core';

@Component({
  selector: 'app-tab-di-ricerca',
  templateUrl: './tab-di-ricerca.component.html',
  styleUrl: './tab-di-ricerca.component.css'
})
export class TabDiRicercaComponent {

  showUsers: boolean = true;
  showTournaments: boolean = false;

  visualizzaUtenti() {
    this.showTournaments = false;
    this.showUsers = true;
  }
  visualizzaTornei() {
    this.showUsers = false;
    this.showTournaments = true;
  }

}
