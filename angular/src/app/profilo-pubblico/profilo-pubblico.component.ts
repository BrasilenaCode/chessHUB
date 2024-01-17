import {Component, Inject, PLATFORM_ID} from '@angular/core';
import { OnInit } from '@angular/core';
import { UtentiService } from '../services/utenti.service';
import {NavigationEnd, Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Partita} from "../model/partita";
import { PartitaService } from '../services/partita.service';
import {AuthServiceService} from "../services/auth.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-profilo-pubblico',
  templateUrl: './profilo-pubblico.component.html',
  styleUrl: './profilo-pubblico.component.css',
})
export class ProfiloPubblicoComponent implements OnInit{
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private utentiService: UtentiService, private activatedRoute: ActivatedRoute, private partiteService: PartitaService, private auth:AuthServiceService, private router:Router) { }
  pagina?: string = "";
  partite?: Partita[]=[];
  partiteFuoriTorneo?: Partita[];
  seguendo?: boolean=false;
  richiestaInviata?: boolean = false;
  registrato: boolean = true;
  admin: boolean = false;
  utenteAdmin: boolean = false;
  username?: string;
  condizione1: number=0;
  condizione2: number=0;
  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event && event.routerEvent instanceof NavigationEnd && isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    });
    this.username=this.activatedRoute.snapshot.queryParams["username"];
    this.getPaginaUtente();
    this.getPartiteUtente();
    if(!this.auth.isAuthenticated()) {
      this.registrato = false;
    }else{
      this.auth.isAdmin().subscribe(risultato => {
        this.admin = risultato;
      });
      // verifica se l'utente è admin o se lo segui già
      this.utentiService.verificaSeAdmin(this.username).subscribe(risultato => this.utenteAdmin = risultato);
      this.utentiService.verificaSeSeguiUtente(this.username).subscribe(risultato => {
        this.seguendo = risultato;
      });
      this.utentiService.verificaRichiestaUtente(this.username).subscribe(risultato => {
        this.richiestaInviata = risultato;
      });
    }
  }
  // richiede il profilo pubblico dell'utente
  getPaginaUtente(): void {
    this.utentiService.paginaProfiloPubblico(this.username!).subscribe(pagina => this.pagina = pagina);
  }
  // richiede le ultime partite giocate dall'utente (anche quelle fuori torneo)
  getPartiteUtente(): void {
    this.partiteService.dammiUltimePartiteGiocate(this.username!).subscribe(partite => {
      this.partite = partite;
      this.condizione1=this.partite.length;
    });
    this.partiteService.dammiUltimePartiteFuoriTorneo(this.username!).subscribe(partite => {
      this.partiteFuoriTorneo = partite
      this.condizione2=this.partiteFuoriTorneo.length;
    });
  }

  vaiAllePartite(): void {
    this.router.navigate(['/partite'], {queryParams: {username: this.username!}});
  }
  // manda una richiesta di follow all'utente
  segui(){
    this.utentiService.seguiUtente(this.username!).subscribe(risultato => {
      if(risultato)
        this.seguendo=true;
      else
        this.richiestaInviata=true;
    });
  }

  // toglie il follow all'utente
  nonSeguire() {
    this.utentiService.smettiDiSeguire(this.username!).subscribe(risultato => {
      this.seguendo=false;
      this.richiestaInviata=false;
    });
  }

  // rende admin l'utente
  rendiAdmin() {
    this.auth.createAdmin(this.username!).subscribe(result=> this.utenteAdmin=true);
  }
}
