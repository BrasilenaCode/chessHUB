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
export class TorneoService {

  private backendUrl = "http://localhost:8080";

  constructor(private http:HttpClient, private auth:AuthServiceService) { }

  dammiTorneo(id:number):Observable<Torneo>{
    return this.http.post<Torneo>(this.backendUrl+"/tornei/id",id);
  }
  dammiTornei():Observable<Torneo[]>{
    return this.http.get<Torneo[]>(this.backendUrl+"/tornei/all");
  }
  dammiTorneiNome(nome:string):Observable<Torneo[]>{
    return this.http.post<Torneo[]>(this.backendUrl+"/tornei/nome", nome);
  }
  dammiTorneiGiocatore(utente:Utente):Observable<Torneo[]>{
    return this.http.post<Torneo[]>(this.backendUrl+"/tornei/giocatore",utente.username);
  }
  dammiTorneiDataInizio(data:Date):Observable<Torneo[]>{
    return this.http.post<Torneo[]>(this.backendUrl+"/tornei/dataInizio/", data.getFullYear()+"-"+(data.getMonth()+1)+"-"+data.getDay());
  }
  dammiTorneiDataFine(data:Date):Observable<Torneo[]>{
    return this.http.post<Torneo[]>(this.backendUrl+"/tornei/dataFine/", data.getFullYear()+"-"+(data.getMonth()+1)+"-"+data.getDay());
  }
  dammiTorneiLuogo(luogo:string):Observable<Torneo[]>{
    return this.http.post<Torneo[]>(this.backendUrl+"/tornei/luogo/", luogo);
  }
  dammiTorneiStato(stato:string):Observable<Torneo[]>{
    return this.http.post<Torneo[]>(this.backendUrl+"/tornei/stato", stato);
  }
  dammiTorneiNumeroPartecipantiMaggiore(numero:number):Observable<Torneo[]>{
    return this.http.post<Torneo[]>(this.backendUrl+"/tornei/numeroPartecipantiMaggiore", numero);
  }
  dammiTorneiNumeroPartecipantiMinore(numero:number):Observable<Torneo[]>{
    return this.http.post<Torneo[]>(this.backendUrl+"/tornei/numeroPartecipantiMinore", numero);
  }
  dammiTorneiNumeroPartecipantiUguale(numero:number):Observable<Torneo[]>{
    return this.http.post<Torneo[]>(this.backendUrl+"/tornei/numeroPartecipantiUguale", numero);
  }
  dammiTorneiGiocatoreVincitore(utente:Utente):Observable<Torneo[]>{
    return this.http.post<Torneo[]>(this.backendUrl+"/tornei/vincitore", utente.username);
  }
  // TODO: possono farlo solo gli amministratori
  dammiNuovoTorneo(utenti:Utente[]):Observable<Torneo>{
    return this.http.post<Torneo>(this.backendUrl+"/tornei/nuovo",utenti);
  }
  prova():any{
    window.alert("prova");
  }

  addTorneo(torneo: TorneoForm):Observable<boolean> {
    return this.http.post<boolean>(this.backendUrl+"/tornei/add", torneo);
  }

  searchTorneo(searchTerm: string):Observable<Torneo[]>{
    return this.http.post<Torneo[]>(this.backendUrl+"/tornei/search", searchTerm);
  }
  iscriviGiocatore(torneoId: number | undefined):Observable<boolean>{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<boolean>(this.backendUrl+"/tornei/iscrivimi", torneoId, header);
  }
  generaTorneo(torneoId: number | undefined):Observable<Partita[]>{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<Partita[]>(this.backendUrl+"/tornei/genera", torneoId, header);
  }
  isIscritto(torneoId: number | undefined):Observable<boolean>{
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<boolean>(this.backendUrl+"/tornei/isIscritto", torneoId, header);
  }

  dammiPartite(torneoId: number) {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<Partita[]>(this.backendUrl+"/tornei/partite", torneoId, header);
  }

  ricercaTornei(param: string): Observable<Torneo[][]> {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<Torneo[][]>(this.backendUrl+"/tornei/ricerca", param, header);
  }
  disiscriviGiocatore(id: number | undefined) {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<boolean>(this.backendUrl+"/tornei/disiscrivimi", id, header);
  }
}
