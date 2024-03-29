import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import { Torneo } from '../model/torneo';
import {AuthServiceService} from "../services/auth.service";

@Component({
  selector: 'app-tornei',
  templateUrl: './tornei.component.html',
  styleUrl: './tornei.component.css'
})
export class TorneiComponent implements OnInit{
  searchTerm: string = '';
  tornei?: Torneo[];
  isAdmin:boolean=false;

  constructor(private router:Router, private auth:AuthServiceService) { }

  addTorneo() {
    //va alla pagina di aggiunta del torneo
    this.router.navigate(['/addTorneo']);
  }

  protected readonly faAdd = faAdd;

  ngOnInit(): void {
    // se l'utente è autenticato, si verifica che sia admin
    // (in base a questo verranno mostrate le funzionalità admin)
    if(this.auth.isAuthenticated())
      this.auth.isAdmin().subscribe(result=> this.isAdmin=result);
    else
      this.isAdmin=false;
  }
}
