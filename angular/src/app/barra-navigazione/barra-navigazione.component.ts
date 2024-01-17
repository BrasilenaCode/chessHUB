import {Component, HostListener, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthServiceService} from "../services/auth.service";
import { Router } from '@angular/router';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-barra-navigazione',
  templateUrl: './barra-navigazione.component.html',
  styleUrl: './barra-navigazione.component.css'
})
export class BarraNavigazioneComponent implements OnInit {
  constructor(private authService: AuthServiceService, private router:Router, @Inject(PLATFORM_ID) private platformId: Object){}

  isNavbarToggled = false;
  show:boolean=false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowWidth();
  }
  //funzione che controlla la larghezza della finestra per decidere se far apparire il menù a tendina o meno
  checkWindowWidth(): void {
    let screenWidth=0;
    if(isPlatformBrowser(this.platformId))
         screenWidth = window.innerWidth;
    const breakpointWidth = 576;
    if (screenWidth >= breakpointWidth){
      this.isNavbarToggled = false;
      this.show=true;
    }else{
      this.show=false;
    }
  }
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
  doLogin() {
    this.router.navigate(["/login"]);
  }
  ngOnInit(): void {
    this.checkWindowWidth();
  }
}
