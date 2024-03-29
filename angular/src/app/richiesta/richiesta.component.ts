import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Utente} from "../model/utente";
import {UtentiService} from "../services/utenti.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-richiesta',
  templateUrl: './richiesta.component.html',
  styleUrl: './richiesta.component.css'
})
export class RichiestaComponent {
  @Input() richiesta?: Utente;
  nascondi?: boolean = false;
  @Output() refreshParent = new EventEmitter<void>();
  statoRichiesta?: string = "";

  constructor(private utentiService: UtentiService, private router:Router){}

  accetta() {
    // per accettare richieste di amicizia
    this.utentiService.accettaRichiesta(this.richiesta).subscribe(response=>{
      this.nascondi = true;
      this.refreshParent.emit();
      this.statoRichiesta = "Richiesta accettata";
    });
  }

  rifiuta() {
    // per rifiutare richieste di amicizia
    this.utentiService.rifiutaRichiesta(this.richiesta).subscribe(response=>{
      this.nascondi = true;
      this.statoRichiesta = "Richiesta rifiutata";
    });
  }

  // per visitare il profilo dell'utente che ti ha fatto richiesta
  vaiAlProfilo(username: string | undefined) {
    this.router.navigate(['/profiloPubblico'], {queryParams: {username: username}});
  }
}
