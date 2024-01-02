import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UtentiService } from '../services/utenti.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PartitaService } from '../services/partita.service';
import { Partita } from '../model/partita';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent implements OnInit{
  constructor(private utentiService: UtentiService, private router: Router, private activatedRoute: ActivatedRoute, private partiteService: PartitaService) { }
  pagina?: string = "";
  partite?: Partita[];
  ngOnInit(): void {
    this.getPaginaUtente();
  }
  getPaginaUtente(): void {
    this.utentiService.dammiUtenteAcceduto().subscribe(utente => {
      this.utentiService.paginaProfilo(utente).subscribe(pagina => this.pagina = pagina)
      this.partiteService.dammiUltimePartiteGiocate(utente.username).subscribe(partite => this.partite = partite);
    });
  }
  vaiAlleStatistiche(): void {
    this.router.navigate(['/statistiche']);
  }
}
