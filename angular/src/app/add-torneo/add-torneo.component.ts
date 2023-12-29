import { Component } from '@angular/core';
import {Torneo, TorneoForm} from "../model/torneo";
import {TorneoService} from "../services/torneo.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-torneo',
  templateUrl: './add-torneo.component.html',
  styleUrl: './add-torneo.component.css'
})
export class AddTorneoComponent {

  errorMessage: string = '';
  nome=new FormControl();
  dataInizio=new FormControl();
  dataFine=new FormControl();
  luogo=new FormControl();
  constructor(private torneoService: TorneoService) {
  }

  addTorneo(){
    if(this.nome.value==null || this.nome.value=="" || this.dataInizio.value==null || this.dataFine.value==null || this.luogo.value==null || this.luogo.value==""){
      this.errorMessage="Compilare campi mancanti";
      return;
    }
    if(this.dataInizio.value>this.dataFine.value){
      this.errorMessage="La data di inizio deve essere precedente a quella di fine";
      return;
    }
    const torneo:TorneoForm= {
      nome: this.nome.value,
      dataInizio: this.dataInizio.value,
      dataFine: this.dataFine.value,
      numeroPartecipanti: 0,
      stato: "attuale",
      luogo: this.luogo.value,
    };
    this.torneoService.addTorneo(torneo).subscribe(response => {
      window.alert("Torneo aggiunto con successo");
    });
  }

  clearErrorMessage(){
    this.errorMessage = '';
  }
}
