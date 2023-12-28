import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Torneo } from '../model/torneo';
import { TorneoService } from '../services/torneo.service';

@Component({
  selector: 'app-tornei',
  templateUrl: './tornei.component.html',
  styleUrl: './tornei.component.css'
})
export class TorneiComponent implements OnInit{
  tornei?: Torneo[];
  constructor(private torneoService: TorneoService) { }
  ngOnInit(): void {
    this.getTornei();
  }
  getTornei(): void {
    this.torneoService.dammiTorneiStato("attuali").subscribe
    (tornei => this.tornei = tornei);
  }
}
