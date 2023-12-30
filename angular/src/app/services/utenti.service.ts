import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utente } from '../model/utente';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  private backendUrl = "http://localhost:8080"

  constructor(private http:HttpClient, private auth:AuthServiceService) {}

  dammiUtente(username:string):Observable<Utente>{
    return this.http.post<Utente>(this.backendUrl + "/utenti/username", username)
  }
  // TODO: possono farlo solo utenti loggati o amministratori
  dammiUtentiNome(nome:string):Observable<Utente[]>{
    return this.http.post<Utente[]>(this.backendUrl + "/utenti/nome", nome)
  }
  // TODO: possono farlo solo utenti loggati o amministratori
  dammiUtentiCognome(cognome:string):Observable<Utente[]>{
    return this.http.post<Utente[]>(this.backendUrl + "/utenti/cognome", cognome)
  }
  dammiUtentiNazionalita(nazionalita:string):Observable<Utente[]>{
    return this.http.post<Utente[]>(this.backendUrl + "/utenti/nazionalita", nazionalita)
  }
  dammiUtentiEtaMaggiore(eta:number):Observable<Utente[]>{
    return this.http.post<Utente[]>(this.backendUrl + "/utenti/etaMaggiore", eta)
  }
  dammiUtentiEtaMinore(eta:number):Observable<Utente[]>{
    return this.http.post<Utente[]>(this.backendUrl + "/utenti/etaMinore", eta)
  }
  dammiUtentiEtaUguale(eta:number):Observable<Utente[]>{
    return this.http.post<Utente[]>(this.backendUrl + "/utenti/etaUguale", eta)
  }
  dammiUtentiPunteggioMaggiore(punteggio:number):Observable<Utente[]>{
    return this.http.post<Utente[]>(this.backendUrl + "/utenti/punteggioMaggiore", punteggio)
  }
  dammiUtentiPunteggioMinore(punteggio:number):Observable<Utente[]>{
    return this.http.post<Utente[]>(this.backendUrl + "/utenti/punteggioMinore", punteggio)
  }
  dammiUtentiPunteggioUguale(punteggio:number):Observable<Utente[]>{
    return this.http.post<Utente[]>(this.backendUrl + "/utenti/punteggioUguale", punteggio)
  }

  dammiUtenteAcceduto():Observable<Utente>{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.get<Utente>(this.backendUrl + "/utente", header)
  }
  dammiUtenti():Observable<Utente[]>{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.token)
    }
    return this.http.get<Utente[]>(this.backendUrl + "/utenti/all", header)
  }

  getUtente(username:string):Observable<Utente>{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.token)
    }
    return this.http.post<Utente>(this.backendUrl + "/getUtente", username, header)
  }
  aggiungiUtente(utente:Utente):any{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.token)
    }

    return this.http.post(this.backendUrl+"/addUtente", utente, header).subscribe((risposta) => {
    console.log('Risposta dal backend:', risposta);}, (errore) => {
    console.error('Errore durante la richiesta al backend:', errore);
    }
    );
  }
  updateUtente(utente:Utente):any{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.token)
    }
    return this.http.post(this.backendUrl+"/updateUtente", utente, header).subscribe((risposta) => {
    console.log('Risposta dal backend:', risposta);}, (errore) => {
    console.error('Errore durante la richiesta al backend:', errore);
    }
    );
  }

  deleteUtente(utente:Utente):any{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.token)
    }
    return this.http.post(this.backendUrl+"/deleteUtente", utente, header).subscribe((risposta) => {
    console.log('Risposta dal backend:', risposta);}, (errore) => {
    console.error('Errore durante la richiesta al backend:', errore);
    }
    );
  }
  paginaProfilo(utente:Utente):Observable<string>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + this.auth.getToken()
    });
    return this.http.post(this.backendUrl+"/utenti/profilo", utente, {headers, responseType: 'text'});
  }
  getStatistiche(): Observable<number[]>{
    console.log("ciaoooo" + this.auth.token)
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<number[]>(this.backendUrl + "/utenti/statistiche", '', header)
  }
}
