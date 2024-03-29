import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { PartitaService } from '../services/partita.service';
import { Partita } from '../model/partita';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-tutte-le-partite',
  templateUrl: './tutte-le-partite.component.html',
  styleUrl: './tutte-le-partite.component.css'
})
export class TutteLePartiteComponent implements OnInit{
  caricamento: boolean = true;
  partite?: Partita[];
  partiteVisualizzate?: Partita[];
  username?: string;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private partiteService: PartitaService, private activatedRoute:ActivatedRoute, private router:Router) { }

  all: boolean = true;
  showPublic: boolean = false;
  showFriends: boolean = false;
  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event && event.routerEvent instanceof NavigationEnd && isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    });
    this.all=true;
    this.getPartiteGiocate();
  }
  getPartiteGiocate(): void {
    // prendo le partite concluse dell'utente
    this.username=this.activatedRoute.snapshot.queryParams['username'];
    this.partiteService.dammiPartiteGiocatore(this.username!).subscribe(partite => {
      this.partite = partite.filter(partita => (partita.esito != "0"))
      this.partiteVisualizzate=this.partite;
      this.caricamento = false;
    });
  }

  visualizzaPubbliche() {
    // visualizzo solo le partite pubbliche
    this.showPublic = true;
    this.showFriends = false;
    this.all = false;
    this.partiteVisualizzate=this.partite?.filter(partita => partita.privacy == "pubblica");
  }

  visualizzaTutte() {
    // visualizzo tutte le partite
    this.showPublic = false;
    this.showFriends = false;
    this.all = true;
    this.partiteVisualizzate=this.partite;
  }

  visualizzaAmici() {
    // visualizzo gli amici
    this.showPublic = false;
    this.showFriends = true;
    this.all = false;
    this.partiteVisualizzate=this.partite?.filter(partita => partita.privacy == "amici");
  }
}
