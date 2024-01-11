import {Component, OnInit} from '@angular/core';
import {Utente} from "../model/utente";
import {Router} from "@angular/router";
declare const dammiUtenteAcceduto: any;
declare const submit: any;
@Component({
  selector: 'app-modifica-dati',
  templateUrl: './modifica-dati.component.html',
  styleUrl: './modifica-dati.component.css'
})
export class ModificaDatiComponent implements OnInit{
  utente?:Utente;
  submitted = false;
  constructor(private router:Router) {}

  ngOnInit(): void {
    dammiUtenteAcceduto();
  }
  protected readonly Object = Object;
  onSubmit() {
    this.submitted=true;
    submit();
    this.router.navigate(['/profilo']);
  }
}
