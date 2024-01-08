import { Component } from '@angular/core';
import {AuthServiceService} from "../services/auth.service";
import { Router } from '@angular/router';
import { ExchangeDataService } from '../services/exchange-data.service';
import { Location } from '@angular/common';
import {faAdd, faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-barra-navigazione',
  templateUrl: './barra-navigazione.component.html',
  styleUrl: './barra-navigazione.component.css'
})
export class BarraNavigazioneComponent {

  constructor(private authService: AuthServiceService,
              private exchDataService: ExchangeDataService,
              private location: Location,
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
    const toSearch: string = event.target.value;
    if (toSearch === '') {
      this.location.back()
    } else {
      this.router.navigate(['/ricerca'])
      this.exchDataService.updateString(event.target.value)
    }
  }

  onFocus() {
    this.router.navigate(['/ricercaUtente'])
  }


  protected readonly faSearch = faSearch;
  protected readonly faAdd = faAdd;
}
