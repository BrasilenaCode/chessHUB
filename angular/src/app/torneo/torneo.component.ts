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

  turno: number = 0;
  torneo?: Torneo;
  partiteTurno:Partita[][] = [];
  flagIscritto: boolean = false;
  flagAdmin: boolean = false;
  flagPartite: boolean = true;
  constructor(private torneoService: TorneoService, private activatedRoute: ActivatedRoute, private authService: AuthServiceService) {}

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.queryParams['torneoId']);
    this.torneoService.dammiTorneo(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(torneo => this.torneo = torneo);
    this.torneoService.isIscritto(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(risultato => {this.flagIscritto = risultato});
    this.authService.isAdmin().subscribe(risultato => {this.flagAdmin = risultato});
    this.torneoService.dammiPartite(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(partite => {
      this.loadPartite(partite);
      if(partite?.length > 0) {
        this.turno = 1;
        this.flagPartite = false;
      }
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

  loadPartite(partite?: Partita[]){
    if(partite == null)
      return;
    if(this.partiteTurno == null)
      return;
    for(let i = 0; i < partite.length; i++){
      while(this.partiteTurno.length < partite[i].turno){
        this.partiteTurno?.push([]);
      }
      this.partiteTurno[partite[i].turno-1].push(partite[i]);
    }
  }

  generaTorneo(){
    this.torneoService.generaTorneo(this.torneo?.id).subscribe(risultato => {
      if(risultato) {
        this.flagPartite = false;
        if(this.torneo!=undefined)
          this.torneo.stato = "inCorso";
        this.loadPartite(risultato);
      }
    });
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  prossimoTurno(){
    if(this.turno < this.partiteTurno!.length - 1)
      this.turno++;
  }

  precedenteTurno(){
    if(this.turno > 0)
      this.turno--;
  }
}
