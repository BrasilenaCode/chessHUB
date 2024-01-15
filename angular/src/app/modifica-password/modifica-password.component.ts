import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "../services/auth.service";
declare const submitPassword: any;
@Component({
  selector: 'app-modifica-password',
  templateUrl: './modifica-password.component.html',
  styleUrl: './modifica-password.component.css'
})
export class ModificaPasswordComponent {
  submitted = false;

  constructor(private router:Router, private auth:AuthServiceService) {
  }
  onSubmit() {
    submitPassword().then((response: string) => {
      if(response=="ok"){
        this.auth.removeToken();
        alert("Password modificata con successo, effettua nuovamente il login");
        this.router.navigate(['/login']);
      }else{
        alert(response);
      }
    });
  }
}
