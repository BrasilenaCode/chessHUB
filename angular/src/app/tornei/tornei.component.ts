import { Component } from '@angular/core';
import { TorneoService } from '../services/torneo.service';
import {Router} from "@angular/router";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import { Torneo } from '../model/torneo';

@Component({
  selector: 'app-tornei',
  templateUrl: './tornei.component.html',
  styleUrl: './tornei.component.css'
})
export class TorneiComponent{
  searchTerm: string = '';
  tornei?: Torneo[];

  constructor(private router:Router, private torneoService: TorneoService) { }

  addTorneo() {
    this.router.navigate(['/addTorneo']);
  }

  onSearch(){
    this.router.navigate(['/searchResults'], {queryParams: {searchTerm: this.searchTerm}});
  }

  protected readonly faAdd = faAdd;
}
