import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partita } from '../model/partita';

@Injectable({
  providedIn: 'root'
})
export class PartitaService {

  private backendUrl = "http://localhost:8080";  
  
  constructor(private http:HttpClient) { }

  dammiPartite():Observable<Partita[]>{
    return this.http.get<Partita[]>(this.backendUrl+"/partite/all");
  }
  dammiPartita(id:number):Observable<Partita>{
    return this.http.post<Partita>(this.backendUrl+"/partite/id",id);
  }
  daammiPartiteGiocatore(username:string):Observable<Partita[]>{
    return this.http.post<Partita[]>(this.backendUrl+"/partite/giocatore",username);
  }
  dammiPartiteTorneo(id:number):Observable<Partita[]>{
    return this.http.post<Partita[]>(this.backendUrl+"/partite/torneo",id);
  }
  dammiPartiteData(data:Date):Observable<Partita[]>{
    return this.http.post<Partita[]>(this.backendUrl+"/partite/data",data.getFullYear()+"-"+(data.getMonth()+1)+"-"+data.getDay());
  }
  dammiPartiteVincitore(username:string):Observable<Partita[]>{
    return this.http.post<Partita[]>(this.backendUrl+"/partite/vincitore",username);
  }
  dammiPartitePerdente(username:string):Observable<Partita[]>{
    return this.http.post<Partita[]>(this.backendUrl+"/partite/perdente",username);
  }
  dammiPartitePatte(username:string):Observable<Partita[]>{
    return this.http.post<Partita[]>(this.backendUrl+"/partite/patte",username);
  }
}
