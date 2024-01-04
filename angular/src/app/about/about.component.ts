import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UtentiService} from "../services/utenti.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{

  public pagina?:string;
  constructor(private utentiService: UtentiService) {
  }
  ngOnInit(): void {
    this.utentiService.dammiUtenteAcceduto().subscribe(utente => {
      this.utentiService.paginaProfilo(utente).subscribe(pagina => this.pagina=pagina);
    });
  }


}
