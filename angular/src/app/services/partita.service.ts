import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partita } from '../model/partita';
import { AuthServiceService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartitaService {

  private backendUrl = "http://localhost:8080";

  constructor(private http:HttpClient, private auth: AuthServiceService) { }

  dammiPartite():Observable<Partita[]>{
    return this.http.get<Partita[]>(this.backendUrl+"/partite/all");
  }
  dammiPartita(id:number):Observable<Partita>{
    return this.http.post<Partita>(this.backendUrl+"/partite/id",id);
  }
  dammiPartiteGiocatore(username:string):Observable<Partita[]>{
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
  dammiUltimePartiteGiocate(username:string):Observable<Partita[]>{
    return this.http.post<Partita[]>(this.backendUrl+"/partite/ultime",username);
  }

  salvaPartita(partita:Partita){
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<number>(this.backendUrl+"/partite/salva",partita, header);
  }

  aggiornaPartiteCustom() {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post(this.backendUrl+"/partite/setCustom","", header);
  }

  dammiUltimePartiteFuoriTorneo(username: string) {
    return this.http.post<Partita[]>(this.backendUrl+"/partite/ultimeFuoriTorneo",username);
  }

  eliminaPartita(id:number){
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post(this.backendUrl+"/partite/elimina",id, header);
  }
}
