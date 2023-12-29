import { Component } from '@angular/core';
import {AuthServiceService} from "../services/auth.service";
@Component({
  selector: 'app-barra-navigazione',
  templateUrl: './barra-navigazione.component.html',
  styleUrl: './barra-navigazione.component.css'
})
export class BarraNavigazioneComponent {
  constructor(private authService: AuthServiceService){}

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
  doLogout(){
    this.authService.logout();
  }
}
