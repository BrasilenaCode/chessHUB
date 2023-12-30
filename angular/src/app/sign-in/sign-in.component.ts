import { Component } from '@angular/core';
import {FormControl } from "@angular/forms";
import {AuthServiceService} from "../services/auth.service";
import {Router} from "@angular/router";
import { Utente } from '../model/utente';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  submitted = false;
  username = new FormControl();
  password = new FormControl();
  repeatedPassword = new FormControl();
  nome=new FormControl();
  cognome= new FormControl();
  nazionalita=new FormControl();
  dataNascita= new FormControl();
  errorMessage = "";
  nationalities: string[] = [
    'Italiana',
    'Tedesca',
    'Francese',
    'Spagnola',
    'Indiana',
    'Giapponese',
    'Cinese',
    'Brasiliana',
    'Canadese',
    'Australiana',
    'Britannica',
    'Messicana',
    'Sudcoreana',
    'Russa'
  ];

  constructor(private auth:AuthServiceService, private router:Router) {
}

  registrati() {
    this.submitted = true;
    if(this.sonoValide(this.username, this.password, this.nome, this.cognome, this.nazionalita)&&this.dataNascita.value!=null) {
      var utente: Utente = {
        username: this.username.value,
        password: this.password.value,
        nome: this.nome.value,
        cognome: this.cognome.value,
        nazionalita: this.nazionalita.value,
        dataNascita: this.dataNascita.value,
        admin: false,
        punteggio: 0,
        punteggioSettimanale: 0
      }
      if (this.password.value == this.repeatedPassword.value) {
          if (new Date(this.dataNascita.value) < new Date()) {
            this.auth.signIn(utente).subscribe(response => {
              if (response) {
                this.auth.setToken(response.token);
                this.router.navigate(["/"]);
                this.errorMessage = "";
              } else {
                this.errorMessage = "Nome utente già in uso";
              }
            });
          } else {
            console.log(this.dataNascita.value, new Date());
            this.errorMessage = "Data di nascita non valida";
          }
        } else {
          this.errorMessage = "Le password non coincidono";
        }
      }
  }

  clearErrorMessage() {
    this.errorMessage = "";
  }

  sonoValide(...variabili: (FormControl | null)[]): boolean {
    return variabili.every(variabile => variabile?.valid);
  }
}
