import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UtentiService } from '../services/utenti.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent implements OnInit{
  constructor(private utentiService: UtentiService, private router: Router) { }
  pagina?: string = "";
  ngOnInit(): void {
    this.getPaginaUtente();
  }
  getPaginaUtente(): void {
    this.utentiService.dammiUtenteAcceduto().subscribe(utente => this.utentiService.paginaProfilo(utente).subscribe(pagina => this.pagina = pagina));
  }
  vaiAlleStatistiche(): void {
    this.router.navigate(['/statistiche']);
  }
}
