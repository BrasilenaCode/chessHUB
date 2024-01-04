import {Component, Input} from '@angular/core';
import {Utente} from "../model/utente";
import {UtentiService} from "../services/utenti.service";

@Component({
  selector: 'app-richiesta',
  templateUrl: './richiesta.component.html',
  styleUrl: './richiesta.component.css'
})
export class RichiestaComponent {
  @Input() richiesta?: Utente;
  nascondi?: boolean = false;
  constructor(private utentiService: UtentiService){}

  accetta() {
    this.utentiService.accettaRichiesta(this.richiesta).subscribe(response=>
      this.nascondi = true);
  }

  rifiuta() {
    this.utentiService.rifiutaRichiesta(this.richiesta).subscribe(response=>
    this.nascondi = true);
  }
}
