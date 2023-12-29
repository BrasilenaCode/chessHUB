import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Torneo } from '../model/torneo';
import { TorneoService } from '../services/torneo.service';
import {Router} from "@angular/router";
import {faAdd} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-tornei',
  templateUrl: './tornei.component.html',
  styleUrl: './tornei.component.css'
})
export class TorneiComponent implements OnInit{
  tornei?: Torneo[];
  torneiConclusi?: Torneo[];
  constructor(private router:Router, private torneoService: TorneoService) { }
  ngOnInit(): void {
    this.getTornei();
    this.getTorneiConclusi();
  }
  getTornei(): void {
    this.torneoService.dammiTorneiStato("attuale").subscribe
    (tornei => this.tornei = tornei);
  }

  getTorneiConclusi(): void {
    this.torneoService.dammiTorneiStato("concluso").subscribe
    (tornei => this.torneiConclusi = tornei);
  }

  addTorneo() {
    this.router.navigate(['/addTorneo']);
  }

  protected readonly faAdd = faAdd;
}
