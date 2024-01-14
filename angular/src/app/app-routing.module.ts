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
import {RichiestaComponent} from "./richiesta/richiesta.component";
import { AddPartitaComponent } from './add-partita/add-partita.component';
import { AnteprimaProfiloComponent } from './anteprima-profilo/anteprima-profilo.component';
import { TutteLePartiteComponent } from './tutte-le-partite/tutte-le-partite.component';
import {AmiciComponent} from "./amici/amici.component";
import {ModificaDatiComponent} from "./modifica-dati/modifica-dati.component";
import {ModificaPasswordComponent} from "./modifica-password/modifica-password.component";
import { TabDiRicercaComponent } from './tab-di-ricerca/tab-di-ricerca.component';
import { CreaPgnComponent } from './crea-pgn/crea-pgn.component';
import { TorneiViciniComponent } from './tornei-vicini/tornei-vicini.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {"path": "", component: HomeComponent},
  {"path": "login", component: LoginComponent},
  {"path": "about", component: AboutComponent},
  {"path": "profilo", component: ProfiloComponent, canActivate:[AuthGuardService]},
  {"path": "tornei", component: TorneiComponent},
  {"path": "classifica", component: ClassificaComponent},
  {"path": "addTorneo", component: AddTorneoComponent},
  {"path": "searchResults", component: SearchResultsComponent},
  {"path": "signIn", component: SignInComponent},
  {"path": "torneo", component: TorneoComponent},
  {"path": "statistiche", component: StatisticheComponent, canActivate:[AuthGuardService]},
  {"path": "profiloPubblico", component: ProfiloPubblicoComponent},
  {"path": "richiesta", component: RichiestaComponent, canActivate:[AuthGuardService]},
  {"path": "partita", component: PartitaComponent},
  {"path": "addPartita", component: AddPartitaComponent},
  {"path": "ricercaUtente", component: AnteprimaProfiloComponent},
  {"path": "partite", component: TutteLePartiteComponent, canActivate:[AuthGuardService]},
  {"path": "amici", component: AmiciComponent,  canActivate:[AuthGuardService]},
  {"path": "modificaDati", component: ModificaDatiComponent, canActivate:[AuthGuardService]},
  {"path": "modificaPassword", component: ModificaPasswordComponent, canActivate:[AuthGuardService]},
  {"path": "torneiVicini", component: TorneiComponent},
  {"path": "amici", component: AmiciComponent},
  {"path": "ricerca", component: TabDiRicercaComponent},
  {"path": "generatorePgn", component: CreaPgnComponent},
  {"path": "**", component: Page404Component}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
