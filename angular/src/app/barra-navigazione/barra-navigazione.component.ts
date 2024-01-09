import {Component, HostListener} from '@angular/core';
import {AuthServiceService} from "../services/auth.service";
import { Router } from '@angular/router';
import {faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-barra-navigazione',
  templateUrl: './barra-navigazione.component.html',
  styleUrl: './barra-navigazione.component.css'
})
export class BarraNavigazioneComponent {

  isNavbarToggled = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowWidth();
  }

  checkWindowWidth(): void {
    const screenWidth = window.innerWidth;
    const breakpointWidth = 576;

    if (screenWidth >= breakpointWidth)
      this.isNavbarToggled = false;
  }
  constructor(private authService: AuthServiceService,
              private router:Router){}


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
  protected readonly faSearch = faSearch;
}
