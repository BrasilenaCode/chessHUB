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
  public uuid: string = '';

  // prende il token dal browser
  getToken(){
    if (this.token == undefined){
      if(isPlatformBrowser(this.platformId)) {
        this.token = window.localStorage.getItem("utente_token");
      }
    }
    return this.token;
  }

  // setta il token nel browser
  setToken(token:string){
    this.token = token;
    if(isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem("utente_token", token);
    }
  }

  // rimuove il token dal browser
  removeToken(){
    this.token = undefined;
    if(isPlatformBrowser(this.platformId)) {
      window.localStorage.removeItem("utente_token");
    }
  }

  // chiamata al backend per capire se il mio token è valido
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

  // ritorna vero se il token esiste
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

  // chiedo al backend di mandarmi un nuovo codice sulla mail
  // (sto mandando il mio uuid corrente nel caso stessi richiedendo un nuovo codice
  // ma quello precedente è ancora rimasto nella mappa del backend)
  getAuthCodeUUID(email: string) {
    const myJsonObject = {
      id: this.uuid,
      mail: email
    };
    const json = JSON.stringify(myJsonObject);
    this.http.post<string>(this.backendUrl + "/authcode", json).subscribe(uuid => {
      this.uuid = uuid;
    });
  }

  // mando al backend l'id della richiesta di verifica del codice e il codice inserito dall'utente
  // da usare quando si vuole modificare il profilo
  verifyAuthCodeWhenAuthenticated(uuid: string, code: string): Observable<string> {
    const myJsonObject = {
      id: this.uuid,
      code: code
    };
    const json = JSON.stringify(myJsonObject);

    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.getToken())
    }
    
    return this.http.post<string>(this.backendUrl + "/verify/authcode/authenticated", json, header);
  }

  // mando al backend l'id della richiesta di verifica del codice e il codice inserito dall'utente
  // da usare prima di completare una registrazione al sito
  verifyAuthCodeWhenRegistering(uuid: string, code: string): Observable<string> {
    const myJsonObject = {
      id: this.uuid,
      code: code
    };
    const json = JSON.stringify(myJsonObject);

    return this.http.post<string>(this.backendUrl + "/verify/authcode/notauthenticated", json);
  }

  // elimina l'uuid
  clearUUID(): void {
    this.uuid = '';
  }

}
