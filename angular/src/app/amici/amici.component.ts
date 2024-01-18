import {Component, OnInit} from '@angular/core';
import {UtentiService} from "../services/utenti.service";
import {Utente} from "../model/utente";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthServiceService} from "../services/auth.service";

@Component({
  selector: 'app-amici',
  templateUrl: './amici.component.html',
  styleUrl: './amici.component.css'
})
export class AmiciComponent implements OnInit{
  amici?: Utente[];

  constructor(private utentiService: UtentiService, private activatedRoute: ActivatedRoute, private router: Router, private auth:AuthServiceService) {
  }
  ngOnInit(): void {
    //prendo gli amici dell'utente
    this.utentiService.getFollowers(this.activatedRoute.snapshot.queryParams['utente']).subscribe(amici => this.amici = amici);
  }

  vaiAlProfilo(amico: Utente) {
    if(!this.auth.isAuthenticated())
      this.router.navigate(['/profiloPubblico'], {queryParams: {username: amico.username}});
    //vado al profilo dell'amico cliccato o al mio profilo personale se clicco sul mio nome
    this.utentiService.dammiUtenteAcceduto().subscribe(utenteAcceduto => {
      if (utenteAcceduto.username == amico.username)
        this.router.navigate(['/profilo']);
      else
        this.router.navigate(['/profiloPubblico'], {queryParams: {username: amico.username}});
    });
  }
}
