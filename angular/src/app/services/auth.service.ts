import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthToken, Utente, UtenteLogin } from '../model/utente';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService{
  private backendUrl = "http://localhost:8080";
  public token?:string | null;

  getToken(){
    if (this.token == undefined){
      if(isPlatformBrowser(this.platformId)) {
        this.token = window.localStorage.getItem("utente_token");
      }
    }
    return this.token;
  }
  setToken(token:string){
    this.token = token;
    if(isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem("utente_token", token);
    }
  }

  removeToken(){
    this.token = undefined;
    window.localStorage.removeItem("utente_token");
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http:HttpClient, private router:Router) { }

  checkAuthentication(){
    this.http.post<AuthToken>(this.backendUrl + "/isAuthenticated",
    {"Authorization":"Basic " + this.token}, {withCredentials: true}).subscribe(
      res => {
        if (!res){
          this.removeToken();
        }
      }
    );
  }

  isAuthenticated(){
    return this.getToken() != undefined;
  }

  login(username:string, password:string){
    var utente:UtenteLogin = {"username": username, "password": password};
    this.http.post<AuthToken>(this.backendUrl + "/login",utente,{withCredentials: true})
    .subscribe(response => {
      this.setToken(response.token);
      this.router.navigate(["/"]);
    });
  }
  logout(){
    this.http.post<AuthToken>(this.backendUrl + "/logout",
    {"Authorization":"Basic " + this.token}, {withCredentials: true}).subscribe(
      res => {
        if (res){
          this.removeToken();
        }
        this.router.navigate(["/"]);
      }
    );
  }
}
