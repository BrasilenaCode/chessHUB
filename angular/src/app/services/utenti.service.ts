import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utente } from '../model/utente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  private backendUrl = "http://localhost:8080"

  constructor(private http:HttpClient) {}

  dammiUtenti():Observable<Utente[]>{
    return this.http.get<Utente[]>(this.backendUrl + "/utenti/all")
  }
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

}
