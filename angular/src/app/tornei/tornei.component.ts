import {Component, OnInit} from '@angular/core';
import { TorneoService } from '../services/torneo.service';
import {Router} from "@angular/router";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import { Torneo } from '../model/torneo';
import {UtentiService} from "../services/utenti.service";

@Component({
  selector: 'app-tornei',
  templateUrl: './tornei.component.html',
  styleUrl: './tornei.component.css'
})
export class TorneiComponent implements OnInit{
  searchTerm: string = '';
  tornei?: Torneo[];
  isAdmin:boolean=false;

  constructor(private router:Router, private torneoService: TorneoService, utentiService:UtentiService) { }

  addTorneo() {
    this.router.navigate(['/addTorneo']);
  }

  onSearch(){
    this.router.navigate(['/searchResults'], {queryParams: {searchTerm: this.searchTerm}});
  }

  protected readonly faAdd = faAdd;

  ngOnInit(): void {

  }
}
