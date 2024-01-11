import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { UtentiService } from '../services/utenti.service';
import { Utente } from '../model/utente';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.css']
})

export class StatisticheComponent implements OnInit {
  @ViewChild("chart") chart!: ElementRef;
  caricamentoFinito: boolean = false;
  utente!: Utente;
  numVinte?: number = 0;
  numPerse?: number = 0;
  numPatte?: number = 0;
  numTorneiVinti?: number = 0;
  isScreenResized: boolean = true;
  constructor(private utentiService: UtentiService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.checkWindowWidth()
      this.utentiService.getStatistiche().subscribe({
        next: list => {
          this.numVinte = list[0];
          this.numPerse = list[1];
          this.numPatte = list[2];
          this.numTorneiVinti = list[3];
          this.caricamentoFinito = true;
          this.createBarChart()
        },
        error: error => console.error('Errore nella chiamata HTTP:', error)
      })

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowWidth();
  }
  checkWindowWidth(): void {
    let screenWidth=0;
    if(isPlatformBrowser(this.platformId))
         screenWidth = window.innerWidth;
    const breakpointWidth = 750;

    if (screenWidth >= breakpointWidth){
      this.isScreenResized = true;

    }else{
      this.isScreenResized = false;
    }
  }
  createBarChart() {
    const ctx = this.chart.nativeElement.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Grafico di visualizzazione'],
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
        responsive: true,
        aspectRatio: 1.7,
        scales: {
          y: {
            ticks: {
              stepSize: 1,
            }
          }
        }
      }
    });
  }

}
