import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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
  listOfUsers: Utente[][] = [];
  researchType: string[] = [
                            'Ricerca per nome utente', 
                            'Ricerca per nome', 
                            'Ricerca per cognome'
                           ];

  constructor(private exchDataService: ExchangeDataService,
              private utentiService: UtentiService,
              private router:Router) {}

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

  vaiAlProfilo(utente:Utente) {
    this.utentiService.dammiUtenteAcceduto().subscribe(utenteAcceduto => {
      if (utenteAcceduto.username == utente.username)
        this.router.navigate(['/profilo']);
      else
        this.router.navigate(['/profiloPubblico'], {queryParams: {username: utente.username}});
    });
  }
}
