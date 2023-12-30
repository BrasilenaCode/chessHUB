import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { UtentiService } from '../services/utenti.service';
import { Utente } from '../model/utente';

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.css']
})

export class StatisticheComponent implements AfterViewInit, OnInit {
  @ViewChild("chart") chart!: ElementRef;

  utente: any;
  constructor(private utentiService: UtentiService) { }
  
  ngOnInit(): void {
    this.utentiService.dammiUtenteAcceduto().subscribe({
      next: utente => {
          this.utente = utente;
          console.log('Utente ricevuto:', utente);
      },
      error: error => console.error('Errore nella chiamata HTTP:', error)
    });
  }

  ngAfterViewInit(): void {
    this.createBarChart();
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
            data: ['90'],
            backgroundColor: 'blue'
          },
          {
            label: "Sconfitte",
            data: ['123'],
            backgroundColor: 'red'
          },
          {
            label: "Patte",
            data: ['32'],
            backgroundColor: 'grey'
          },
          {
            label: "Vittorie tornei",
            data: ['3'],
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