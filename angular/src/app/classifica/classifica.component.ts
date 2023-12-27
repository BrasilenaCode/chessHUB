import { Component, Input } from '@angular/core';
import { Utente } from '../model/utente';
import { UtentiService } from '../utenti.service';

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.component.html',
  styleUrl: './classifica.component.css'
})
export class ClassificaComponent {
  @Input()utenti?:Utente[]
  
    ngOnInit(){
      this.getUtenti();
    }
    constructor(private utentiService:UtentiService){}
    getUtenti(){
        this.utentiService.dammiUtenti().subscribe(user=> this.utenti=user);
    }
}
