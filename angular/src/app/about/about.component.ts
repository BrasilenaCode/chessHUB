import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthServiceService} from "../services/auth.service";
import {UtentiService} from "../services/utenti.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  @ViewChild('profiloLink') profiloLink?: ElementRef;
  public pagina?: string;
  private username?: string;

  constructor(private utentiService: UtentiService) {
  }

  ngOnInit(): void {
    this.utentiService.dammiUtenteAcceduto().subscribe(utente => {
      this.username = utente.username;
      this.utentiService.paginaProfilo(utente).subscribe(pagina => this.pagina = pagina);
    });
  }
}
