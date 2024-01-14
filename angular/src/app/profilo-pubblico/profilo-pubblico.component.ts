import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UtentiService } from '../services/utenti.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Partita} from "../model/partita";
import { PartitaService } from '../services/partita.service';
import {AuthServiceService} from "../services/auth.service";

@Component({
  selector: 'app-profilo-pubblico',
  templateUrl: './profilo-pubblico.component.html',
  styleUrl: './profilo-pubblico.component.css',
})
export class ProfiloPubblicoComponent implements OnInit{
  constructor(private utentiService: UtentiService, private activatedRoute: ActivatedRoute, private partiteService: PartitaService, private auth:AuthServiceService, private router:Router) { }
  pagina?: string = "";
  partite?: Partita[];
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
    this.username=this.activatedRoute.snapshot.queryParams["username"];
    this.getPaginaUtente();
    this.getPartiteUtente();
    if(!this.auth.isAuthenticated()) {
      this.registrato = false;
    }else{
      this.auth.isAdmin().subscribe(risultato => {
        this.admin = risultato;
      });
      this.utentiService.verificaSeAdmin(this.username).subscribe(risultato => this.utenteAdmin = risultato);
      this.utentiService.verificaSeSeguiUtente(this.username).subscribe(risultato => {
        this.seguendo = risultato;
      });
      this.utentiService.verificaRichiestaUtente(this.username).subscribe(risultato => {
        this.richiestaInviata = risultato;
      });
    }
  }
  getPaginaUtente(): void {
    this.utentiService.paginaProfiloPubblico(this.username!).subscribe(pagina => this.pagina = pagina);
  }
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
  segui(){
    this.utentiService.seguiUtente(this.username!).subscribe(risultato => {
      if(risultato)
        this.seguendo=true;
      else
        this.richiestaInviata=true;
    });
  }

  nonSeguire() {
    this.utentiService.smettiDiSeguire(this.username!).subscribe(risultato => {
      this.seguendo=false;
      this.richiestaInviata=false;
    });
  }

  rendiAdmin() {
    this.auth.createAdmin(this.username!).subscribe(result=> this.utenteAdmin=true);
  }
}
