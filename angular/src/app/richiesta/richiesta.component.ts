import {Component, Input} from '@angular/core';
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
  constructor(private utentiService: UtentiService, private router:Router){}

  accetta() {
    this.utentiService.accettaRichiesta(this.richiesta).subscribe(response=>{
      this.nascondi = true;
      this.router.navigateByUrl('/profilo', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.router.url]);
      });
    });
  }

  rifiuta() {
    this.utentiService.rifiutaRichiesta(this.richiesta).subscribe(response=>
    this.nascondi = true);
  }
}
