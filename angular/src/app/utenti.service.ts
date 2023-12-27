import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utente } from './model/utente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  private backendUrl = "http://localhost:8080"

  constructor(private http:HttpClient) {}
  dammiUtenti():Observable<Utente[]>{
    var header = {
      headers: new HttpHeaders()
    }
    return this.http.get<Utente[]>(this.backendUrl + "/getUtenti", header)
  }
}
