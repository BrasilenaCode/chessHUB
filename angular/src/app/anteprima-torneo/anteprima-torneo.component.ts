import { Component, OnInit } from '@angular/core';
import { ExchangeDataService } from '../services/exchange-data.service';
import { Router } from '@angular/router';
import { TorneoService } from '../services/torneo.service';
import { Torneo } from '../model/torneo';

@Component({
  selector: 'app-anteprima-torneo',
  templateUrl: './anteprima-torneo.component.html',
  styleUrl: './anteprima-torneo.component.css'
})
export class AnteprimaTorneoComponent implements OnInit {

  toSearch: string = '';
  listOfTournaments: Torneo[][] = [];
  researchType: string[] = [
                              'Ricerca per nome',
                              'Ricerca per luogo'
                           ];

  constructor(private exchDataService: ExchangeDataService,
    private torneiService: TorneoService,
    private router:Router) {}
    
    ngOnInit() {
      this.exchDataService.currentString.subscribe((newString) => {
        if (newString != '') {
          this.toSearch = newString;
          this.torneiService.ricercaTornei(this.toSearch).subscribe(
            utenti => {
              if (utenti && utenti != undefined) {
                this.listOfTournaments = []
                this.listOfTournaments = utenti;
              }
            }
          )
        } else {
          this.listOfTournaments = []
        }
      });
    }
}
