import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.css'
})
export class Page404Component implements OnInit{
  testoCompleto : string[] = [
    "Solo la mia nemica di sempre,",
    "l’abominevole dama nera",
    "ha avuto nerbo pari al mio",
    "nel soccorrere il suo re inetto.",
    "Inetto, imbelle pure il mio, s’intende:",
    "fin dall’inizio è rimasto acquattato",
    "dietro la schiera dei suoi bravi pedoni,",
    "ed è fuggito poi per la scacchiera",
    "sbieco, ridicolo, in passetti impediti:",
    "le battaglie non sono cose da re.",
    "Ma io!",
    "Se non ci fossi stata io!",
    "Torri e cavalli si, ma io!",
    "Potente e pronta, dritta e diagonale,",
    "lungiportante come una balestra,",
    "ho perforato le loro difese;",
    "hanno dovuto chinare la testa",
    "i neri fraudolenti ed arroganti.",
    "La vittoria ubriaca come un vino.",
    "Ora tutto è finito,",
    "sono spenti l’ingegno e l’odio.",
    "Una gran mano ci ha spazzati via,",
    "deboli e forti, savi, folli e cauti,",
    "i bianchi e i neri alla rinfusa, esanimi.",
    "Poi ci ha gettati con scroscio di ghiaia",
    "Dentro la scatola buia di legno",
    "Ed ha chiuso il coperchio.",
    "Quando un’altra partita?",
    "-",
    "Primo Levi, 9 maggio 1984",
    ];

  testoVisualizzato: string[] = [];
  velocitaScrittura: number = 60;
  velocitaRiga: number = 500;
  nRiga: number = 0
  end : boolean = false;

  constructor() { }

  ngOnInit(): void {
    try{
      window.setTimeout(() => this.scriviTesto(), 5000);
    }catch(e){}
  }

  scriviTesto(): void {
    let riga = this.testoCompleto.shift();
    this.testoVisualizzato.push("");
    this.scrollToBottomIfNeeded();
    let i = 0;
    try{
      let intervallo = window.setInterval(() => {
        this.testoVisualizzato[this.nRiga] += riga![i];
        i++;
        if (i == riga!.length) {
          this.nRiga++;
          window.clearInterval(intervallo);
          if (this.testoCompleto.length > 0){
            
            window.setTimeout(() => this.scriviTesto(), this.velocitaRiga);
            
          }
          else
            this.end = true;
        }
      }, this.velocitaScrittura);
    }catch(e){}
  }

  scrollToBottomIfNeeded() {
    try{
      const scrollPosizione = window.innerHeight + window.scrollY;
      const soglia = 200;
    
      if (document.body.scrollHeight - scrollPosizione <= soglia) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    }catch(e){
    }
  }

  home(){
    window.location.href = "/";
  }
}
