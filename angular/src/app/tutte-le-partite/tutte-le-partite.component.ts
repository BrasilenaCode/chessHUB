import { Component, OnInit } from '@angular/core';
import { UtentiService } from '../services/utenti.service';
import { PartitaService } from '../services/partita.service';
import { Partita } from '../model/partita';

@Component({
  selector: 'app-tutte-le-partite',
  templateUrl: './tutte-le-partite.component.html',
  styleUrl: './tutte-le-partite.component.css'
})
export class TutteLePartiteComponent implements OnInit{
  partite?: Partita[];

  constructor(private utentiService: UtentiService, private partiteService: PartitaService) { }

  ngOnInit(): void {
    this.getPartiteGiocate();
  }
  getPartiteGiocate(): void {
    this.utentiService.dammiUtenteAcceduto().subscribe(utente => {
      this.partiteService.dammiPartiteGiocatore(utente.username).subscribe(partite => this.partite = partite.filter(partita => partita.esito != "0"));
    });
  }
}
