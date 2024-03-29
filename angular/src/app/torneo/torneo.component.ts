import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { Torneo } from '../model/torneo';
import {ActivatedRoute, NavigationEnd} from '@angular/router';
import { TorneoService } from '../services/torneo.service';
import { AuthServiceService } from '../services/auth.service';
import {Partita} from "../model/partita";
import {Utente} from "../model/utente";
import { UtentiService } from '../services/utenti.service';
import { Router } from '@angular/router';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrl: './torneo.component.css'
})
export class TorneoComponent implements OnInit{

  caricamentoFinito: boolean = false;

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
  actualCustom: number[] = new Array<number>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private torneoService: TorneoService, private activatedRoute: ActivatedRoute, private authService: AuthServiceService, private utentiService: UtentiService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event && event.routerEvent instanceof NavigationEnd && isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    });
    // Recupero dei dettagli del torneo: punteggi, partite e gli utenti partecipanti
    this.torneoService.dammiTorneo(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(torneo => {
      this.torneo = torneo
      if(this.torneo.stato=="passato" && this.torneo.vincitore.username=="custom")
        this.torneo.vincitore.username="eliminato";
    });
    this.torneoService.dammiUtentiTorneo(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(utenti => {
      this.utentiTorneo = utenti;

      var ac = 1;
      for (let i = 0; i < this.utentiTorneo.length; i++) {
        if(this.utentiTorneo[i].username=="custom"){
          this.actualCustom.push(ac);
          ac++;
        } else {
          this.actualCustom.push(0);
        }
      }
    });
    this.torneoService.dammiPunteggi(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(punteggi => this.punteggiTorneo = new Map(Object.entries(punteggi)));
    this.torneoService.dammiPartite(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(partite => {
      this.caricamentoFinito = true;
      this.loadPartite(partite);
      if(partite?.length > 0) {
        this.turno = 0;
        this.flagPartite = false;
      }
    });
    this.cercaUtente();

    // controllo se l'utente è autenticato
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

  // ricerca l'utente attualmente loggato
  cercaUtente(): any | undefined {
    this.utentiService.dammiUtenteAcceduto().subscribe(utenteAcceduto=> {
      if(utenteAcceduto!=undefined)
        this.usernameUtente = utenteAcceduto.username;
    });
  }

  // invia una richiesta di iscrizione al torneo
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

  // Carica le partite organizzandole per turno
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

  // invia una richiesta per generare le partite del torneo
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

  // invia una richiesta per chiudere il torneo
  chiudiTorneo(){
    this.torneoService.chiudiTorneo(this.torneo?.id).subscribe(risultato => {
      if(!risultato) {
        this.flagErrore = true;
      } else {
        this.torneoService.dammiTorneo(parseInt(this.activatedRoute.snapshot.queryParams['torneoId'])).subscribe(torneo => {
          this.torneo = torneo;
        });
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

  // invia una richiesta per disiscriversi dal torneo
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

  // Naviga alla pagina del profilo utente, pubblico o privato, in base all'utente cliccato
  visualizzaUtente(user: Utente) {
    if(user.username=="eliminato")
      return;
    if(this.usernameUtente!=undefined&&user.username==this.usernameUtente)
      this.router.navigate(['/profilo']);
    else
      this.router.navigate(['/profiloPubblico'], {queryParams: {username: user.username}});
  }

}
