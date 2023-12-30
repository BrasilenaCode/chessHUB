import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UtentiService } from '../services/utenti.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent implements OnInit{
  constructor(private utentiService: UtentiService) { }
  pagina?: string = "";
  ngOnInit(): void {
    this.getPaginaUtente();
  }
  getPaginaUtente(): void {
    this.utentiService.dammiUtenteAcceduto().subscribe(utente => this.utentiService.paginaProfilo(utente).subscribe(pagina => this.pagina = pagina));
  }
}
