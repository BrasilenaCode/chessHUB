import {Component, OnInit} from '@angular/core';
import {UtentiService} from "../services/utenti.service";
import {Utente} from "../model/utente";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-amici',
  templateUrl: './amici.component.html',
  styleUrl: './amici.component.css'
})
export class AmiciComponent implements OnInit{
  amici?: Utente[];

  constructor(private utentiService: UtentiService, private activatedRoute: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {
    this.utentiService.getFollowers(this.activatedRoute.snapshot.queryParams['utente']).subscribe(amici => this.amici = amici);
  }

  vaiAlProfilo(amico: Utente) {
    this.utentiService.dammiUtenteAcceduto().subscribe(utenteAcceduto => {
      if (utenteAcceduto.username == amico.username)
        this.router.navigate(['/profilo']);
      else
        this.router.navigate(['/profiloPubblico'], {queryParams: {username: amico.username}});
    });
  }
}
