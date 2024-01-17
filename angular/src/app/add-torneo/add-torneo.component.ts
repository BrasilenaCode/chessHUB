import { Component } from '@angular/core';
import {TorneoForm} from "../model/torneo";
import {TorneoService} from "../services/torneo.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-torneo',
  templateUrl: './add-torneo.component.html',
  styleUrl: './add-torneo.component.css'
})
export class AddTorneoComponent {

  torneoAggiunto: boolean = false;
  errorMessage: string = '';
  nome=new FormControl();
  dataInizio=new FormControl();
  dataFine=new FormControl();
  luogo=new FormControl();
  constructor(private torneoService: TorneoService) {
  }

  addTorneo(){
    //validazione campi
    if(this.nome.value==null || this.nome.value=="" || this.dataInizio.value==null || this.dataFine.value==null || this.luogo.value==null || this.luogo.value==""){
      this.errorMessage="Compilare campi mancanti";
      return;
    }
    if(this.dataInizio.value>this.dataFine.value){
      this.errorMessage="La data di inizio deve essere precedente a quella di fine";
      return;
    }
    if(this.dataInizio.value < new Date().toJSON()){
      this.errorMessage="La data di inizio deve essere successiva a quella odierna";
      return;
    }
    //creazione oggetto torneo
    const torneo:TorneoForm= {
      nome: this.nome.value,
      dataInizio: this.dataInizio.value,
      dataFine: this.dataFine.value,
      numeroPartecipanti: 0,
      stato: "prossimo",
      luogo: this.luogo.value,
    };
    //chiamata al service per aggiungere il torneo
    this.torneoService.addTorneo(torneo).subscribe(response => {
      this.torneoAggiunto = true;
    });
  }

  clearErrorMessage(){
    this.errorMessage = '';
  }
}
