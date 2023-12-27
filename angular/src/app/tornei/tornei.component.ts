import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Torneo } from '../model/torneo';
import { TorneoServiceService } from '../torneo-service.service';

@Component({
  selector: 'app-tornei',
  templateUrl: './tornei.component.html',
  styleUrl: './tornei.component.css'
})
export class TorneiComponent implements OnInit{
  tornei?: Torneo[];
  constructor(private torneoService: TorneoServiceService) { }
  ngOnInit(): void {
    this.getTornei();
  }
  getTornei(): void {
    this.torneoService.dammiTorneiStato("attuali").subscribe
    (tornei => this.tornei = tornei);
  }
}
