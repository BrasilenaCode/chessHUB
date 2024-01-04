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
  numeroFollower?: number = 0;
  partite?: Partita[];
  seguendo?: boolean=false;
  richiestaInviata?: boolean = false
  ngOnInit(): void {
    this.getPaginaUtente();
    this.getPartiteUtente();
    this.utentiService.verificaSeSeguiUtente(this.activatedRoute.snapshot.queryParams["username"]).subscribe(risultato => {
      this.seguendo = risultato;
    });
    this.utentiService.verificaRichiestaUtente(this.activatedRoute.snapshot.queryParams["username"]).subscribe(risultato => {
      this.richiestaInviata = risultato;
    });
  }
  getPaginaUtente(): void {
    this.utentiService.paginaProfiloPubblico(this.activatedRoute.snapshot.queryParams["username"]).subscribe(pagina => this.pagina = pagina);
  }
  getPartiteUtente(): void {
    this.partiteService.dammiUltimePartiteGiocate(this.activatedRoute.snapshot.queryParams["username"]).subscribe(partite => this.partite = partite);
  }

  segui(){
    this.utentiService.seguiUtente(this.activatedRoute.snapshot.queryParams["username"]).subscribe(risultato => {
      if(this.numeroFollower!=undefined){
        this.numeroFollower++;
      }
      if(risultato)
        this.seguendo=true;
      else
        this.richiestaInviata=true;
    });
  }

  nonSeguire() {
    this.utentiService.smettiDiSeguire(this.activatedRoute.snapshot.queryParams["username"]).subscribe(risultato => {
      if(this.numeroFollower!=undefined){
        this.numeroFollower--;
      }
      this.seguendo=false;
      this.richiestaInviata=false;
    });
  }
}
