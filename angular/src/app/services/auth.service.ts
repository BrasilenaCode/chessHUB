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
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http:HttpClient, private router:Router) { }

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
    console.log("removeToken DFNSKJDFNKSD")
    this.token = undefined;
    if(isPlatformBrowser(this.platformId)) {
      window.localStorage.removeItem("utente_token");
    }
  }

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

  login(username:string, password:string):boolean{
    var utente:UtenteLogin = {"username": username, "password": password};
    var resp:boolean = false;
    this.http.post<AuthToken>(this.backendUrl + "/login",utente,{withCredentials: true}).subscribe(response => {
      if (response){
        this.setToken(response.token);
        this.router.navigate(["/"]);
        resp=true;
      }
    });
    return resp;
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
