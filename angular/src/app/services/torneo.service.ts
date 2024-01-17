import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Torneo, TorneoForm} from '../model/torneo';
import { Utente } from '../model/utente';
import {AuthServiceService} from "./auth.service";
import {Partita} from "../model/partita";

@Injectable({
  providedIn: 'root'
})
// classe che gestisce le chiamate al backend per i tornei
export class TorneoService {
  // url del backend
  private backendUrl = "http://localhost:8080";
  // costruttore
  constructor(private http:HttpClient, private auth:AuthServiceService) { }
  // metodo che ritorna un torneo dato il suo id
  dammiTorneo(id:number):Observable<Torneo>{
    return this.http.post<Torneo>(this.backendUrl+"/tornei/id",id);
  }
  // metodo che ritorna tutti i tornei
  dammiTornei():Observable<Torneo[]>{
    return this.http.get<Torneo[]>(this.backendUrl+"/tornei/all");
  }
  // metodo che ritorna tutti i tornei di un certo stato
  dammiTorneiStato(stato:string):Observable<Torneo[]>{
    return this.http.post<Torneo[]>(this.backendUrl+"/tornei/stato", stato);
  }
  // metodo per aggiungere un torneo
  addTorneo(torneo: TorneoForm):Observable<boolean> {
    return this.http.post<boolean>(this.backendUrl+"/tornei/add", torneo);
  }
  // metodo iscrivere un giocatore ad un torneo
  iscriviGiocatore(torneoId: number | undefined):Observable<boolean>{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<boolean>(this.backendUrl+"/tornei/iscrivimi", torneoId, header);
  }
  // metodo per generare un torneo
  generaTorneo(torneoId: number | undefined):Observable<Partita[]>{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<Partita[]>(this.backendUrl+"/tornei/genera", torneoId, header);
  }
  // metodo per chiudere un torneo
  chiudiTorneo(torneoId: number | undefined):Observable<boolean>{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<boolean>(this.backendUrl+"/tornei/chiudi", torneoId, header);
  }
  // metodo per verificare se un giocatore è iscritto ad un torneo
  isIscritto(torneoId: number | undefined):Observable<boolean>{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<boolean>(this.backendUrl+"/tornei/isIscritto", torneoId, header);
  }
  // metodo per ottenere le partite di un torneo
  dammiPartite(torneoId: number) {
    return this.http.post<Partita[]>(this.backendUrl+"/tornei/partite", torneoId);
  }
  // metodo per cercare un torneo
  ricercaTornei(param: string): Observable<Torneo[][]> {
    return this.http.post<Torneo[][]>(this.backendUrl+"/tornei/ricerca", param);
  }
  // metodo per disiscrivere un giocatore da un torneo
  disiscriviGiocatore(id: number | undefined) {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<boolean>(this.backendUrl+"/tornei/disiscrivimi", id, header);
  }
  // metodo per aggiornare iscrizioni custom
  aggiornaIscrizioneCustom() {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<boolean>(this.backendUrl+"/tornei/aggiornaCustom", "", header);
  }
  // metodo per ottenere gli utenti di un torneo
  dammiUtentiTorneo(id: number): Observable<Utente[]> {
    return this.http.post<Utente[]>(this.backendUrl+"/tornei/utentiTorneo", id);
  }
  // metodo per ottenere i punteggi di un torneo
  dammiPunteggi(id: number) {
    return this.http.post<Map<string, number>>(this.backendUrl+"/tornei/punteggiTorneo", id);
  }
}
