import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Torneo } from './model/torneo';
import { Utente } from './model/utente';

@Injectable({
  providedIn: 'root'
})
export class TorneoServiceService {

  private backendUrl = "http://localhost:8080/";  

  constructor(private http:HttpClient) { }

  dammiTorneiGiocatore(utente:Utente):Observable<Torneo[]>{
    return this.http.post<Torneo[]>(this.backendUrl+"tornei/giocatore_",utente.username);
  }
  dammiNuovoTorneo(utenti:Utente[]):Observable<Torneo>{
    return this.http.post<Torneo>(this.backendUrl+"tornei/nuovo",utenti);
  }
  dammiTorneo(id:number):Observable<Torneo>{
    return this.http.get<Torneo>(this.backendUrl+"tornei/"+id);
  }
  dammiTorneiData(data:Date):Observable<Torneo[]>{
    return this.http.get<Torneo[]>(this.backendUrl+"tornei/data/"+data);
  }
  dammiTorneiLuogo(luogo:string):Observable<Torneo[]>{
    return this.http.get<Torneo[]>(this.backendUrl+"tornei/luogo/"+luogo);
  }
  dammiTorneiStato(stato:string):Observable<Torneo[]>{
    return this.http.get<Torneo[]>(this.backendUrl+"tornei/stato/"+stato);
  }
}
