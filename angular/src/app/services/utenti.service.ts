import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utente } from '../model/utente';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
// classe che gestisce le chiamate al backend per gli utenti
export class UtentiService {
  // url del backend
  private backendUrl = "http://localhost:8080"
  // costruttore
  constructor(private http:HttpClient, private auth:AuthServiceService) {}
  // metodo per ottenere un utente dato il suo id
  dammiUtente(username:string):Observable<Utente>{
    return this.http.post<Utente>(this.backendUrl + "/utenti/username", username)
  }
  // metodo per ottenere l'utente acceduto
  dammiUtenteAcceduto():Observable<Utente>{
    // se non è autenticato
    if(!this.auth.isAuthenticated())
      // restituisci un observable vuoto
      return new Observable<Utente>();
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    // altrimenti restituisci l'utente acceduto
    return this.http.get<Utente>(this.backendUrl + "/utente", header)
  }
  // metodo per ottenere tutti gli utenti
  dammiUtenti():Observable<Utente[]>{
    return this.http.get<Utente[]>(this.backendUrl + "/utenti/all")
  }
  // metodo per eliminare un utente
  deleteUtente(){
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.token)
    }
    return this.http.post(this.backendUrl+"/deleteUtente", "", header);
  }
  // metodo per ottenere la pagina del profilo di un utente
  paginaProfilo(utente:Utente):Observable<string>{
    return this.http.get(this.backendUrl+"/profilo?username=" + utente.username, {responseType: 'text', withCredentials: true});
  }
  // metodo per ottenere la pagina del profilo pubblico di un utente
  paginaProfiloPubblico(username:string):Observable<string>{
    return this.http.get(this.backendUrl+"/utenti/profiloPubblico?username="+ username, {responseType: 'text'});
  }
  // metodo per ottenere le statistiche di un utente
  getStatistiche(): Observable<number[]>{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<number[]>(this.backendUrl + "/utenti/statistiche", '', header)
  }
  // metodo per mandare una richiesta di amicizia ad un utente
  seguiUtente(queryParam: any) {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post(this.backendUrl + "/utente/segui", queryParam, header)
  }
  // metodo per verificare se si segue un utente
  verificaSeSeguiUtente(queryParam: any):Observable<boolean> {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<boolean>(this.backendUrl + "/utente/followers", queryParam, header)
  }
  // metodo per verificare se si è mandata la richiesta ad un utente
  verificaRichiestaUtente(queryParam: any):Observable<boolean> {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<boolean>(this.backendUrl + "/utente/richiesta", queryParam, header)
  }
  // metodo per smettere di seguire un utente
  smettiDiSeguire(queryParam: any) {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post(this.backendUrl + "/utente/nonSeguire", queryParam, header)
  }
  // metodo per ottenere tutte le richieste di amicizia dell'utente loggato
  dammiRichiesteAmicizia() {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<Utente[]>(this.backendUrl + "/utente/richieste", "", header)
  }
  // metodo per accettare una richiesta di amicizia
  accettaRichiesta(richiesta: Utente | undefined) {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post(this.backendUrl + "/utente/accettaRichiesta", richiesta, header)
  }
  // metodo per rifiutare le richieste di amicizia
  rifiutaRichiesta(richiesta: Utente | undefined) {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post(this.backendUrl + "/utente/rifiutaRichiesta", richiesta, header)
  }
  // metodo per cercare un utente
  ricercaUtente(username: string): Observable<Utente[][]> {
    return this.http.post<Utente[][]>(this.backendUrl + "/utenti/ricerca", username);
  }
  // metodo per ottenere i follower dell'utente loggato
  getFollowers(username:string) {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<Utente[]>(this.backendUrl + "/utente/getFollowers",username, header)
  }
  // verifica se un utente è un admin
  verificaSeAdmin(username: string | undefined) {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<boolean>(this.backendUrl + "/utente/admin",username, header)
  }
}
