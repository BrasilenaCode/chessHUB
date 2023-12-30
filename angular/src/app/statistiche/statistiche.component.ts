import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { UtentiService } from '../services/utenti.service';
import { Utente } from '../model/utente';
import { Partita } from '../model/partita';
import { Torneo } from '../model/torneo';
import { PartitaService } from '../services/partita.service';
import { TorneoService } from '../services/torneo.service';
import { create } from 'domain';

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.css']
})

export class StatisticheComponent implements OnInit {
  @ViewChild("chart") chart!: ElementRef;

  utente!: Utente;
  partiteVinte?: Partita[];
  partitePerse?: Partita[];
  PartitePatte?: Partita[];
  torneiVinti?: Torneo[];

  numVinte?: number = 0;
  numPerse?: number = 0;
  numPatte?: number = 0;
  numTorneiVinti?: number = 0;


  constructor(private utentiService: UtentiService, 
    private partitaService: PartitaService, private torneoService: TorneoService) { }
  
  ngOnInit(): void {
    
      this.utentiService.getStatistiche().subscribe({
        next: list => {
          console.log("ciaoooooooo" + list.length)
          this.numVinte = list[0];
          console.log(list[0])
          this.numPerse = list[1];
          this.numPatte = list[2];
          this.numTorneiVinti = list[3];
          this.createBarChart()
        },
        error: error => console.error('Errore nella chiamata HTTP:', error)
      })
    
  }



  createBarChart() {
    const ctx = this.chart.nativeElement.getContext('2d');
    
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['stats'],
        datasets: [
          {
            label: "Vittorie",
            data: [this.numVinte],
            backgroundColor: 'blue'
          },
          {
            label: "Sconfitte",
            data: [this.numPerse],
            backgroundColor: 'red'
          },
          {
            label: "Patte",
            data: [this.numPatte],
            backgroundColor: 'grey'
          },
          {
            label: "Vittorie tornei",
            data: [this.numTorneiVinti],
            backgroundColor: 'green'
          }

        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}