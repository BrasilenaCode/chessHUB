import { Component } from '@angular/core';
import {AuthServiceService} from "../services/auth.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-barra-navigazione',
  templateUrl: './barra-navigazione.component.html',
  styleUrl: './barra-navigazione.component.css'
})
export class BarraNavigazioneComponent {
  constructor(private authService: AuthServiceService, private router:Router){}

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
  doLogout(){
    console.log("ciaooo")
    this.authService.logout().subscribe(
      res => {
        if(res) {
          console.log("come")
          this.authService.removeToken();
          this.router.navigate(['/']);
        }
      });
  }
}
