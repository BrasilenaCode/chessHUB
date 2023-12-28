import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth.service';
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = new FormControl();
  password = new FormControl();

  constructor(private auth:AuthServiceService){}

  faiLogin(){
    var user = this.username.value;
    var pass = this.password.value;
    this.auth.login(user, pass);
  }
}
