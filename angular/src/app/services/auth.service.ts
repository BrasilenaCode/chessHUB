import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthToken, Utente, UtenteLogin } from '../model/utente';
import { isPlatformBrowser } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

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

  login(username:string, password:string):Observable<AuthToken>{
    var utente:UtenteLogin = {"username": username, "password": password};
    var resp:boolean = false;
    return this.http.post<AuthToken>(this.backendUrl + "/login",utente,{withCredentials: true});
  }
  logout():Observable<boolean>{
    return this.http.post<boolean>(this.backendUrl + "/logout",
    {"Authorization":"Basic " + this.token}, {withCredentials: true});
  }

  signIn(utente: Utente) {
    return this.http.post<AuthToken>(this.backendUrl + "/signIn", utente, {withCredentials: true});
  }
  isAdmin():Observable<boolean>{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.getToken())
    }
    return this.http.post<boolean>(this.backendUrl + "/utenti/isAdmin", "", header);
  }

  createAdmin(username:string) {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.getToken())
    }
    return this.http.get<boolean>(this.backendUrl + "/utenti/createAdmin?username="+username, header);
  }
}
