import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partita } from '../model/partita';
import { AuthServiceService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// classe che gestisce le chiamate al backend per le partite
export class PartitaService {
  // url del backend
  private backendUrl = "http://localhost:8080";
  // costruttore
  constructor(private http:HttpClient, private auth: AuthServiceService) { }
  // metodo che ritorna tutte le partite
  dammiPartite():Observable<Partita[]>{
    return this.http.get<Partita[]>(this.backendUrl+"/partite/all");
  }
  // metodo che ritorna la partita con l'id passato
  dammiPartita(id:number):Observable<Partita>{
    return this.http.post<Partita>(this.backendUrl+"/partite/id",id);
  }
  // metodo che ritorna le partite di un giocatore
  dammiPartiteGiocatore(username:string):Observable<Partita[]>{
    return this.http.post<Partita[]>(this.backendUrl+"/partite/giocatore",username);
  }
  // metodo che ritorna le ultime 3 partite giocate da un giocatore
  dammiUltimePartiteGiocate(username:string):Observable<Partita[]>{
    return this.http.post<Partita[]>(this.backendUrl+"/partite/ultime",username);
  }
  // metodo per salvare la partita
  salvaPartita(partita:Partita){
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<number>(this.backendUrl+"/partite/salva",partita, header);
  }
  // metodo per aggiornare una partita con utenti custom
  aggiornaPartiteCustom() {
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post(this.backendUrl+"/partite/setCustom","", header);
  }
  // metodo che ritorna le ultime 3 partite giocate da un giocatore fuori torneo
  dammiUltimePartiteFuoriTorneo(username: string) {
    return this.http.post<Partita[]>(this.backendUrl+"/partite/ultimeFuoriTorneo",username);
  }
  // metodo per eliminare una partita
  eliminaPartita(id:number){
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.auth.getToken())
    }
    return this.http.post<boolean>(this.backendUrl+"/partite/elimina",id, header);
  }
  // metodo che ritorna tutte le partite fuori torneo
  dammiPartiteFuoriTorneo():Observable<Partita[]>{
    return this.http.get<Partita[]>(this.backendUrl+"/partite/fuoriTorneo");
  }
}
