import { Component } from '@angular/core';
import {ExchangeDataService} from "../services/exchange-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab-di-ricerca',
  templateUrl: './tab-di-ricerca.component.html',
  styleUrl: './tab-di-ricerca.component.css'
})
export class TabDiRicercaComponent {

  constructor(private exchDataService: ExchangeDataService, private router:Router) {
  }

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

  onChanges(event: any) {
    this.router.navigate(['/ricerca'])
    this.exchDataService.updateString(event.target.value)
  }
}
