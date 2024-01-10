import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UtentiService } from '../services/utenti.service';
import { Router } from '@angular/router';
import { PartitaService } from '../services/partita.service';
import { Partita } from '../model/partita';
import {Utente} from "../model/utente";

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent implements OnInit{

  constructor(private utentiService: UtentiService, private router: Router, private partiteService: PartitaService) { }
  pagina?: string = "";
  partite?: Partita[];
  richieste?: Utente[];
  caricamentoFinito: boolean = false;


  ngOnInit(): void {
    this.getPaginaUtente();
    this.getRichiesteAmicizia();
  }
  refreshParentComponent() {
    this.getPaginaUtente();
  }
  getPaginaUtente(): void {
    this.utentiService.dammiUtenteAcceduto().subscribe(utente => {
      this.utentiService.paginaProfilo(utente).subscribe(pagina => this.pagina = pagina)
      this.partiteService.dammiUltimePartiteGiocate(utente.username).subscribe(partite => this.partite = partite);
      this.caricamentoFinito = true;
    });
  }
  vaiAlleStatistiche(): void {
    this.router.navigate(['/statistiche']);
  }
  vaiAllePartite(): void {
    this.router.navigate(['/partite']);
  }

  private getRichiesteAmicizia() {
    this.utentiService.dammiRichiesteAmicizia().subscribe(richieste => this.richieste = richieste);
  }
}
