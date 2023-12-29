import { Component, Input } from '@angular/core';
import { TorneoService } from '../services/torneo.service';
import { Torneo } from '../model/torneo';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-tornei-in-corso',
  templateUrl: './tornei-in-corso.component.html',
  styleUrl: './tornei-in-corso.component.css'
})
export class TorneiInCorsoComponent implements OnInit{
  public tornei?: Torneo[]; 
  constructor(private torneiService:TorneoService) { }
  ngOnInit(): void {
    this.getTorneiInCorso();
  }
  getTorneiInCorso(): void {
    this.torneiService.dammiTorneiStato("inCorso").subscribe
    (tornei => this.tornei = tornei);
  }
}
