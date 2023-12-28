import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  ngOnInit(){
    //this.faiLogin()
  }

  constructor(private auth:AuthServiceService){}

  faiLogin(){
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    var user = this.username;
    var pass = this.password;    
    this.auth.login(user, pass);
  }
}
