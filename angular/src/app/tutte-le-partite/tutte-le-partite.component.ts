import { Component, OnInit } from '@angular/core';
import { PartitaService } from '../services/partita.service';
import { Partita } from '../model/partita';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tutte-le-partite',
  templateUrl: './tutte-le-partite.component.html',
  styleUrl: './tutte-le-partite.component.css'
})
export class TutteLePartiteComponent implements OnInit{
  partite?: Partita[];
  partiteVisualizzate?: Partita[];
  username?: string;
  constructor(private partiteService: PartitaService, private activatedRoute:ActivatedRoute) { }

  all: boolean = true;
  showPublic: boolean = false;
  showFriends: boolean = false;
  ngOnInit(): void {
    this.all=true;
    this.getPartiteGiocate();
  }
  getPartiteGiocate(): void {
    this.username=this.activatedRoute.snapshot.queryParams['username'];
    this.partiteService.dammiPartiteGiocatore(this.username!).subscribe(partite => {
      this.partite = partite.filter(partita => (partita.esito != "0" && partita.esito != "-1"))
      this.partiteVisualizzate=this.partite;
    });
  }

  visualizzaPubbliche() {
    this.showPublic = true;
    this.showFriends = false;
    this.all = false;
    this.partiteVisualizzate=this.partite?.filter(partita => partita.privacy == "public");
  }

  visualizzaTutte() {
    this.showPublic = false;
    this.showFriends = false;
    this.all = true;
    this.partiteVisualizzate=this.partite;
  }

  visualizzaAmici() {
    this.showPublic = false;
    this.showFriends = true;
    this.all = false;
    this.partiteVisualizzate=this.partite?.filter(partita => partita.privacy == "amici");
  }
}
