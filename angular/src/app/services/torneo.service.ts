import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Torneo } from '../model/torneo';
import { Utente } from '../model/utente';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {

  private backendUrl = "http://localhost:8080";  

  constructor(private http:HttpClient) { }

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
}
