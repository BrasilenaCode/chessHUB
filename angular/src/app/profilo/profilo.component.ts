import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UtentiService } from '../services/utenti.service';
import { Router } from '@angular/router';
import { PartitaService } from '../services/partita.service';
import { Partita } from '../model/partita';
import {Utente} from "../model/utente";
import {TorneoService} from "../services/torneo.service";
import {AuthServiceService} from "../services/auth.service";

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent implements OnInit{

  constructor(private utentiService: UtentiService, private router: Router, private partiteService: PartitaService, private torneoService:TorneoService, private auth:AuthServiceService) { }
  pagina?: string = "";
  partite?: Partita[];
  partiteFuoriTorneo?: Partita[];
  richieste?: Utente[];
  caricamentoFinito: boolean = false;
  username?: string;


  ngOnInit(): void {
    this.getPaginaUtente();
    this.getRichiesteAmicizia();
  }
  refreshParentComponent() {
    this.getPaginaUtente();
  }
  getPaginaUtente(): void {
    this.utentiService.dammiUtenteAcceduto().subscribe(utente => {
      this.username = utente.username;
      this.utentiService.paginaProfilo(utente).subscribe(pagina => this.pagina = pagina)
      this.partiteService.dammiUltimePartiteGiocate(utente.username).subscribe(partite => this.partite = partite);
      this.partiteService.dammiUltimePartiteFuoriTorneo(utente.username).subscribe(partite => this.partiteFuoriTorneo = partite);
      this.caricamentoFinito = true;
    });
  }
  vaiAllePartite(): void {
    this.router.navigate(['/partite'], {queryParams: {username: this.username!}});
  }
  private getRichiesteAmicizia() {
    this.utentiService.dammiRichiesteAmicizia().subscribe(richieste => this.richieste = richieste);
  }
  eliminaAccount() {
    const conferma = window.confirm('Sei sicuro di voler eliminare l\'account?');
    if (conferma) {
      this.torneoService.aggiornaIscrizioneCustom().subscribe(result => {
          if(result)
            this.partiteService.aggiornaPartiteCustom().subscribe(result => {
            this.utentiService.deleteUtente().subscribe(result => {
              this.auth.logout().subscribe(
                res => {
                  if (res) {
                    this.auth.removeToken();
                    this.router.navigate(['/']);
                  }
                });
            });
          })
        else
          window.alert("Non è stato possibile eliminare l'account, hai ancora tornei in corso");
        }
      )
    }
  }
}
