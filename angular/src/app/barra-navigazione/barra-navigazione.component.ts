import { Component } from '@angular/core';
import {AuthServiceService} from "../services/auth.service";
import { Router } from '@angular/router';
import { UtentiService } from '../services/utenti.service';
import { Utente } from '../model/utente';
import { ExchangeDataService } from '../services/exchange-data.service';
@Component({
  selector: 'app-barra-navigazione',
  templateUrl: './barra-navigazione.component.html',
  styleUrl: './barra-navigazione.component.css'
})
export class BarraNavigazioneComponent {

  constructor(private authService: AuthServiceService,
              private exchDataService: ExchangeDataService,
              private router:Router){}

  isInputNotEmpty: boolean = false;

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
  doLogout(){
    this.authService.logout().subscribe(
      res => {
        if(res) {
          this.authService.removeToken();
          this.router.navigate(['/']);
        }
      });
  }

  onChanges(event: any) {
    this.exchDataService.updateString(event.target.value)
  }

  onFocus() {
    this.router.navigate(['/ricercaUtente'])
  }

  onBlur() {
    //this.router.navigate(['/']);
  }

}
