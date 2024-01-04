import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TorneoService } from '../services/torneo.service';
import { ActivatedRoute } from '@angular/router';
import { ExchangeDataService } from '../services/exchange-data.service';
import { UtentiService } from '../services/utenti.service';
import { Utente } from '../model/utente';

@Component({
  selector: 'app-anteprima-profilo',
  templateUrl: './anteprima-profilo.component.html',
  styleUrl: './anteprima-profilo.component.css'
})
export class AnteprimaProfiloComponent implements OnInit {

  toSearch: string = '';
  listOfUsers: Utente[] = [];

  constructor(private exchDataService: ExchangeDataService,
              private utentiService: UtentiService) {}
              
  ngOnInit() {
    this.exchDataService.currentString.subscribe((newString) => {
      if (newString != '') {
        this.toSearch = newString;
        this.utentiService.ricercaUtente(this.toSearch).subscribe(
          utenti => {
            if (utenti && utenti != undefined) {
              this.listOfUsers = []
              this.listOfUsers = utenti;
            }
          }
        )
      } else {
        this.listOfUsers = []
      }
    });
  }

}
