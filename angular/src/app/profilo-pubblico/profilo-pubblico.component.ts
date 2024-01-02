import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UtentiService } from '../services/utenti.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Partita} from "../model/partita";
import { PartitaService } from '../services/partita.service';

@Component({
  selector: 'app-profilo-pubblico',
  templateUrl: './profilo-pubblico.component.html',
  styleUrl: './profilo-pubblico.component.css',
})
export class ProfiloPubblicoComponent implements OnInit{
  constructor(private utentiService: UtentiService, private activatedRoute: ActivatedRoute, private partiteService: PartitaService) { }
  pagina?: string = "";
  partite?: Partita[];
  ngOnInit(): void {
    this.getPaginaUtente();
    this.getPartiteUtente();
  }
  getPaginaUtente(): void {
    this.utentiService.paginaProfiloPubblico(this.activatedRoute.snapshot.queryParams["username"]).subscribe(pagina => this.pagina = pagina);
  }
  getPartiteUtente(): void {
    this.partiteService.dammiUltimePartiteGiocate(this.activatedRoute.snapshot.queryParams["username"]).subscribe(partite => this.partite = partite);
  }
}
