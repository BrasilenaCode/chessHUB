import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaServiceService {

  private backendUrl = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  getCaptcha(): Observable<string>{
    return this.http.get(this.backendUrl+"/recaptcha/get", {responseType: 'text'});
  }

  checkCaptcha(c: string, r: string): Observable<boolean>{
    return this.http.post<boolean>(this.backendUrl+"/recaptcha/check", {challenge: c, response: r});
  }
}
