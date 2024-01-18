import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth.service';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import { UtentiService } from '../services/utenti.service';
import { Utente } from '../model/utente';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = new FormControl();
  password = new FormControl();
  mail = new FormControl();
  code = new FormControl();
  buttonText: string = 'Accedi';
  nextStep: boolean = false;
  verifyCode: boolean = false;
  tries: number = 3;
  continueOperation: boolean = false;
  showPasswordForm: boolean = false;
  updatePassword = new FormControl();
  usernameToUpdate = '';
  confirmUpdatePassword = new FormControl();
  errorMessage = "";

  constructor(private auth:AuthServiceService,
     private router:Router,
     private utentiService: UtentiService){}

  // TODO da commentare
  faiLogin(){
    if (this.buttonText == 'Accedi') {
      var user = this.username.value;
      var pass = this.password.value;
      if(user==null || pass==null || user=="" || pass=="") {
        this.errorMessage = "Campi mancanti";
        return;
      }
      this.auth.login(user, pass).subscribe(response=>{
        if(response){
          this.auth.setToken(response.token);
          this.router.navigate(["/"]);
          this.errorMessage = "";
        }else{
          this.errorMessage = "Credenziali errate";
        }
      });
    } else {
      if (this.buttonText == 'Avanti') {
        this.usernameToUpdate = this.username.value;
        var mail = this.mail.value;
        if(this.usernameToUpdate==null || mail==null || this.usernameToUpdate=="" || mail=="") {
          this.errorMessage = "Campi mancanti";
          return;
        }
        this.utentiService.dammiUtente(this.usernameToUpdate).subscribe(utente => {
          if (utente == null) {
            this.errorMessage = "Nessun utente esistente con l'username indicato.";
            return;
          }
          if (utente.email != mail) {
            this.errorMessage = "L'e-mail fornita non coincide con quella associata all'utente.";
            return;
          }
          this.auth.getAuthCodeUUID(utente.email);
          this.buttonText = 'Verifica';
          this.verifyCode = true;
        })
      } else if (this.buttonText == 'Verifica') {
        var code = this.code.value;
        if (code == null || code == '') {
          this.errorMessage = 'Campo mancante';
        }
        if (this.tries > 0 || this.continueOperation) {
          this.auth.verifyAuthCodeWhenRegistering(code).subscribe(response => {
          console.log("ciao codice " + response)
          if (response === "corretto") {
            this.continueOperation = true;
          } else if (response === "sbagliato") {
            this.tries--;
            this.errorMessage = 'Numero di tentativi rimasti: ' + this.tries;
          } else if (response === "errore") {
            this.errorMessage = 'Si è verificato un errore. Consigliato richiedere un nuovo codice.';
            this.tries = 0;
          } else {
            this.errorMessage = 'Si è verificato un errore nel server.';
          }

          if (this.tries == 0) {
            this.auth.clearUUID();
            this.errorMessage = 'Richiedi un nuovo codice.';
            return;
          }
          if (this.continueOperation) {
            this.buttonText = 'Recupera password';
            this.showPasswordForm = true;
            return;
          }
          });
        }
      } else if (this.buttonText == 'Recupera password') {
        var updatePass = this.updatePassword.value;
        var confirmUpdatePass = this.confirmUpdatePassword.value;
        if (updatePass == null || updatePass == '' || confirmUpdatePass == null || confirmUpdatePass == '') {
          this.errorMessage = 'Campi mancanti';
          return;
        }
        if (updatePass != confirmUpdatePass) {
          this.errorMessage = 'Le password non coincidono';
          return;
        }
        if (this.usernameToUpdate != '') {
          this.utentiService.recuperaPassword(this.usernameToUpdate, updatePass).subscribe(risultato => {
            if (risultato) {
              this.showPasswordForm = false;
              this.nextStep = false;
              this.verifyCode = false;
              this.buttonText = 'Accedi'
            }
          })
        }
      }
    }
  }

  setNextStep(bool: boolean) {
    this.nextStep = bool;
  }

  // richiede un nuovo codice
  requestAuthCode(): void {
    this.auth.getAuthCodeUUID(this.mail.value);
    this.tries = 3;
    this.continueOperation = false;
  }

  richiediCodice(): void {
    this.nextStep = true;
    this.buttonText = 'Avanti';
  }

  clearErrorMessage() {
    this.errorMessage = "";
  }
}
