import {Component, OnInit} from '@angular/core';
import {UtentiService} from "../services/utenti.service";
import {Utente} from "../model/utente";

@Component({
  selector: 'app-amici',
  templateUrl: './amici.component.html',
  styleUrl: './amici.component.css'
})
export class AmiciComponent implements OnInit{
  amici?: Utente[];

  constructor(private utentiService: UtentiService) {
  }
  ngOnInit(): void {
    this.utentiService.getFollowers().subscribe(amici => this.amici = amici);
  }
}
