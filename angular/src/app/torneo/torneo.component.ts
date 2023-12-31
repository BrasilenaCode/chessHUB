import { Component, OnInit } from '@angular/core';
import { Torneo } from '../model/torneo';
import { ActivatedRoute } from '@angular/router';
import { TorneoService } from '../services/torneo.service';
import { AuthServiceService } from '../services/auth.service';
import {Partita} from "../model/partita";

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrl: './torneo.component.css'
})
export class TorneoComponent implements OnInit{
  torneo?: Torneo;
  partite?:Partita[];
  flagIscritto: boolean = false;
  flagAdmin: boolean = false;
  flagPartite: boolean = false;
  constructor(private torneoService: TorneoService, private activatedRoute: ActivatedRoute, private authService: AuthServiceService) {}

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.queryParams['torneoId']);
    this.torneoService.dammiTorneo(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(torneo => this.torneo = torneo);
    this.torneoService.isIscritto(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(risultato => {this.flagIscritto = risultato});
    this.authService.isAdmin().subscribe(risultato => {this.flagAdmin = risultato});
    this.torneoService.dammiPartite(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(partite => {
      if(this.torneo!=undefined) {
        if (partite.length == ((this.torneo?.numeroPartecipanti * (this.torneo?.numeroPartecipanti - 1)) / 2))
          this.flagPartite = false;
        else
          this.flagPartite = true;
      }
      this.partite = partite;
    });
  }
  iscrivimi(){
    this.torneoService.iscriviGiocatore(this.torneo?.id).subscribe(risultato => {
      if(risultato){
        this.flagIscritto = true;
        if(this.torneo!=undefined)
          this.torneo.numeroPartecipanti++;
      } else {
        this.flagIscritto = false;
      }
    });
  }
  generaTorneo(){
    this.torneoService.generaTorneo(this.torneo?.id).subscribe(risultato => {
      if(risultato) {
        this.partite = risultato;
        this.flagPartite = false;
      }
    });
  }
  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
}
