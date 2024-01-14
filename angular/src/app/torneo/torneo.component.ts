import { Component, OnInit } from '@angular/core';
import { Torneo } from '../model/torneo';
import { ActivatedRoute } from '@angular/router';
import { TorneoService } from '../services/torneo.service';
import { AuthServiceService } from '../services/auth.service';
import {Partita} from "../model/partita";
import {Utente} from "../model/utente";
import { UtentiService } from '../services/utenti.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrl: './torneo.component.css'
})
export class TorneoComponent implements OnInit{

  turno: number = 0;
  torneo?: Torneo;
  usernameUtente: string = "nessuno";
  utentiTorneo : Utente[] = [];
  partiteTurno:Partita[][] = [];
  punteggiTorneo: Map<string, number>=new Map<string, number>();
  flagIscritto: boolean = false;
  flagAdmin: boolean = false;
  flagPartite: boolean = true;
  flagErrore: boolean = false;
  flagRegistrato:boolean=true;

  constructor(private torneoService: TorneoService, private activatedRoute: ActivatedRoute, private authService: AuthServiceService, private utentiService: UtentiService, private router: Router) {}

  ngOnInit() {
    this.torneoService.dammiTorneo(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(torneo => this.torneo = torneo);
    this.torneoService.dammiPunteggi(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(punteggi =>{
      this.punteggiTorneo = new Map(Object.entries(punteggi));
    });

    this.torneoService.dammiPartite(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(partite => {
      this.loadPartite(partite);
      if(partite?.length > 0) {
        this.turno = 1;
        this.flagPartite = false;
      }
    });
    this.torneoService.dammiUtentiTorneo(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(utenti => this.utentiTorneo = utenti);
    this.cercaUtente();
    if(this.authService.isAuthenticated()) {
      this.torneoService.isIscritto(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(risultato => {
        this.flagIscritto = risultato
      });
      this.authService.isAdmin().subscribe(risultato => {
        this.flagAdmin = risultato
      });
    }else{
      this.flagRegistrato = false;
      this.flagAdmin = false;
    }
  }
  cercaUtente(): any | undefined {
    this.utentiService.dammiUtenteAcceduto().subscribe(utenteAcceduto=> {
      if(utenteAcceduto!=undefined)
        this.usernameUtente = utenteAcceduto.username;
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
      this.partiteTurno[partite[i].turno-1].sort((a, b) => b.esito.localeCompare(a.esito));
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
  chiudiTorneo(){
    this.torneoService.chiudiTorneo(this.torneo?.id).subscribe(risultato => {
      if(!risultato) {
        this.flagErrore = true;
      } else {
        this.flagPartite = true;
        if(this.torneo!=undefined)
          this.torneo.stato = "passato";
      }
    });

  }

  prossimoTurno(){
    if(this.turno < this.partiteTurno!.length - 1)
      this.turno++;
  }

  precedenteTurno(){
    if(this.turno > 0)
      this.turno--;
  }

  discrivimi() {
    this.torneoService.disiscriviGiocatore(this.torneo?.id).subscribe(risultato => {
      if(risultato){
        this.flagIscritto = false;
        if(this.torneo!=undefined)
          this.torneo.numeroPartecipanti--;
      } else {
        this.flagIscritto = true;
      }
    });
  }
  visualizzaUtente(user: Utente) {
    if(user.username=="custom")
      return;
    if(this.usernameUtente!=undefined&&user.username==this.usernameUtente)
      this.router.navigate(['/profilo']);
    else
      this.router.navigate(['/profiloPubblico'], {queryParams: {username: user.username}});
  }

}
