import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UtentiService } from '../services/utenti.service';
import { PartitaService } from '../services/partita.service';
import { Partita } from '../model/partita';

@Component({
  selector: 'app-strumenti',
  templateUrl: './strumenti.component.html',
  styleUrl: './strumenti.component.css'
})
export class StrumentiComponent implements OnInit {
  partite : Partita[] = [];
  caricamento : boolean = true;

  constructor(private authService : AuthServiceService, private router : Router, private utentiService : UtentiService, private partitaService : PartitaService) { }

  ngOnInit(): void {
    // prende tutte le partite fuori torneo
    this.partitaService.dammiPartiteFuoriTorneo().subscribe((partite) => {
      this.partite = partite;
      this.caricamento = false;
    });
  }

  // verifica se l'utente acceduto è autenticato
  autenticato() : boolean {
    return this.authService.isAuthenticated();
  }

  visualizzaPartitaDaPgn() {
    this.router.navigate(['/partita']);
  }

  importaPartita() {
    this.router.navigate(['/generatorePgn']);
  }

  salvaPartita() {
    // porta alla schermata del generatore PGN dell'utente loggato
    this.utentiService.dammiUtenteAcceduto().subscribe((utente) => {
      this.router.navigate(['/generatorePgn'], {queryParams: {username: utente.username}});
    });
  }
  
}
