import {Component, Input, OnInit} from '@angular/core';
import {Partita} from "../model/partita";

@Component({
  selector: 'app-partita-show',
  templateUrl: './partita-show.component.html',
  styleUrl: './partita-show.component.css'
})
export class PartitaShowComponent implements OnInit{
  @Input() partita?: Partita;
  nomePartita: string = " ciao ";

  ngOnInit(): void {
    this.setNomePartita();
  }
  setNomePartita(): void {
    let giocatore1: string | undefined = this.partita?.giocatore1?.username;
    if (giocatore1 == undefined)
      giocatore1 = "Giocatore1";
    let giocatore2: string | undefined = this.partita?.giocatore2?.username;
    if (giocatore2 == undefined)
      giocatore2 = "Giocatore2";
    console.log(giocatore1, giocatore2)
    this.nomePartita = giocatore1 + " vs " + giocatore2;
  }
}
