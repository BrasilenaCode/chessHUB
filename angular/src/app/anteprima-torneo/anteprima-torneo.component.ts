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
  caricamentoFinito: boolean = true;
  listOfTournaments: Torneo[][] = [];
  researchType: string[] = [
                              'Ricerca per nome',
                              'Ricerca per luogo'
                           ];

  constructor(private exchDataService: ExchangeDataService,
    private torneiService: TorneoService,
    private router:Router) {}
    
  ngOnInit() {
    // faccio una subscribe alla stringa del service, e ogni volta che cambia
    // verrà chiamata ricercaUtente
    this.exchDataService.currentString.subscribe((newString) => {
      if (newString != '') {
        this.caricamentoFinito = false;
        this.toSearch = newString;
        this.torneiService.ricercaTornei(this.toSearch).subscribe(
          utenti => {
            if (utenti && utenti != undefined) {
              this.listOfTournaments = []
              this.listOfTournaments = utenti;
            }
            this.caricamentoFinito = true;
          }
        )
      } else {
        this.listOfTournaments = []
        this.caricamentoFinito = true;
      }
    });
  }

  vaiAlTorneo(torneo: Torneo): void{
    this.router.navigate(['/torneo'], {queryParams: {torneoId: torneo.id}});
  }
}
