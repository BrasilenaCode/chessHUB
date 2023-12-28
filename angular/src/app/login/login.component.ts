import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth.service';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = new FormControl();
  password = new FormControl();
  errorMessage = "";

  constructor(private auth:AuthServiceService, private router:Router){}

  faiLogin(){
    var user = this.username.value;
    var pass = this.password.value;
    if(user==null || pass==null || user=="" || pass=="") {
      this.errorMessage = "Campi mancanti";
      return;
    }
    this.auth.login(user, pass).subscribe(response =>{
      if(response!=null) {
        this.auth.setToken(response.token);
        this.router.navigate(["/"]);
      }else{
        this.errorMessage = "Credenziali errate";
      }
    });
  }

  clearErrorMessage() {
    this.errorMessage = "";
  }
}
