import { Component, OnInit, QueryList } from '@angular/core';
import { TorneoService } from '../services/torneo.service';
import { Torneo } from '../model/torneo';
import { query } from 'express';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit{
    tornei?: Torneo[];
    searchTerm: string = '';
    constructor(private torneoService: TorneoService, private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.searchTerm = this.route.snapshot.queryParams['searchTerm'];
      this.torneoService.searchTorneo(this.searchTerm).subscribe(tornei => this.tornei = tornei);
    }

}
