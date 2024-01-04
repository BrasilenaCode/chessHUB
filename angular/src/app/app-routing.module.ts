import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { TorneiComponent } from './tornei/tornei.component';
import { ClassificaComponent } from './classifica/classifica.component';
import { AuthGuardService } from './services/auth-guard.service';
import {AddTorneoComponent} from "./add-torneo/add-torneo.component";
import { SearchResultsComponent } from './search-results/search-results.component';
import { TorneoComponent } from './torneo/torneo.component';
import { StatisticheComponent } from './statistiche/statistiche.component';
import {SignInComponent} from "./sign-in/sign-in.component";
import {ProfiloPubblicoComponent} from "./profilo-pubblico/profilo-pubblico.component";
import { PartitaComponent } from './partita/partita.component';
import { AddPartitaComponent } from './add-partita/add-partita.component';

const routes: Routes = [
  {"path": "", component: HomeComponent},
  {"path": "login", component: LoginComponent},
  {"path": "about", component: AboutComponent, canActivate:[AuthGuardService]},
  {"path": "profilo", component: ProfiloComponent, canActivate:[AuthGuardService]},
  {"path": "tornei", component: TorneiComponent},
  {"path": "classifica", component: ClassificaComponent, canActivate:[AuthGuardService]},
  {"path": "addTorneo", component: AddTorneoComponent},
  {"path": "searchResults", component: SearchResultsComponent},
  {"path": "signIn", component: SignInComponent},
  {"path": "torneo", component: TorneoComponent, canActivate:[AuthGuardService]},
  {"path": "statistiche", component: StatisticheComponent, canActivate:[AuthGuardService]},
  {"path": "giocatore/profilo", component: ProfiloPubblicoComponent},
  {"path": "partita", component: PartitaComponent},
  {"path": "addPartita", component: AddPartitaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
