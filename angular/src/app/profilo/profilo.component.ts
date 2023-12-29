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
  pagina?: string;
  ngOnInit(): void {
    this.getPaginaUtente("admin");
  }
  getPaginaUtente(username:string): void {
    this.utentiService.paginaProfilo(username).subscribe(pagina => this.pagina = pagina);
  }
}
