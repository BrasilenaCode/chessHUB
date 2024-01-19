import { Component, HostListener } from '@angular/core';
import {ExchangeDataService} from "../services/exchange-data.service";
import {Router} from "@angular/router";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tab-di-ricerca',
  templateUrl: './tab-di-ricerca.component.html',
  styleUrl: './tab-di-ricerca.component.css'
})
export class TabDiRicercaComponent {

  constructor(private exchDataService: ExchangeDataService, private router:Router) {
  }

  toSearch = new FormControl();

  // in base al valore delle booleane viene mostrato un tab specifico
  showUsers: boolean = true;
  showTournaments: boolean = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Verifica se il tasto premuto è "Enter" (codice 13)
    if (event.key === 'Enter') {
      // Impedisci il comportamento predefinito del tasto "Enter"
      event.preventDefault();

      // Esegui il submit del form
      this.search();
    }
  }

  visualizzaUtenti() {
    this.showTournaments = false;
    this.showUsers = true;
  }
  visualizzaTornei() {
    this.showUsers = false;
    this.showTournaments = true;
  }

  search(): void {
    var toSearch = this.toSearch.value
    this.exchDataService.updateString(toSearch);
  }

  /*
  onChanges(event: any) {
    this.router.navigate(['/ricerca'])
    // se il contenuto del textfield della ricerca viene modificato, si aggiorna la stringa del servie
    this.exchDataService.updateString(event.target.value)
  }
  */
}
