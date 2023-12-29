import { Component, Input } from '@angular/core';
import { TorneoService } from '../services/torneo.service';
import { Torneo } from '../model/torneo';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-tornei-stato',
  templateUrl: './tornei-stato.component.html',
  styleUrl: './tornei-stato.component.css'
})
export class TorneiStatoComponent implements OnInit{
  @Input() stato: string | undefined;
  public tornei?: Torneo[]; 
  constructor(private torneiService:TorneoService) { }
  ngOnInit(): void {
    this.getTorneiStato();
  }
  getTorneiStato(): void {
    if(this.stato == undefined) return;
    this.torneiService.dammiTorneiStato(this.stato).subscribe
    (tornei => this.tornei = tornei);
  }
}
