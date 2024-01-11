import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavigazioneComponent } from './barra-navigazione/barra-navigazione.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TorneiComponent } from './tornei/tornei.component';
import { ClassificaComponent } from './classifica/classifica.component';
import { TorneoShowComponent } from './torneo-show/torneo-show.component';
import { TorneoService } from './services/torneo.service';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { UtentiService } from './services/utenti.service';
import { PartitaService } from './services/partita.service';
import { RowComponent } from './row/row.component';
import { PartitaShowComponent } from './partita-show/partita-show.component';
import { AddTorneoComponent } from './add-torneo/add-torneo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TorneiStatoComponent } from './tornei-stato/tornei-stato.component';
import { TorneoComponent } from './torneo/torneo.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { StatisticheComponent } from './statistiche/statistiche.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapsComponent } from './maps/maps.component';
import { ProfiloPubblicoComponent } from './profilo-pubblico/profilo-pubblico.component';
import { PartitaComponent } from './partita/partita.component';
import { RichiestaComponent } from './richiesta/richiesta.component';
import { AddPartitaComponent } from './add-partita/add-partita.component';
import { AnteprimaProfiloComponent } from './anteprima-profilo/anteprima-profilo.component';
import { TutteLePartiteComponent } from './tutte-le-partite/tutte-le-partite.component';
import { AmiciComponent } from './amici/amici.component';
import { ModificaDatiComponent } from './modifica-dati/modifica-dati.component';
import { ModificaPasswordComponent } from './modifica-password/modifica-password.component';
import { FooterComponent } from './footer/footer.component';
import { AnteprimaTorneoComponent } from './anteprima-torneo/anteprima-torneo.component';
import { TabDiRicercaComponent } from './tab-di-ricerca/tab-di-ricerca.component';
import { CreaPgnComponent } from './crea-pgn/crea-pgn.component';
import {ProfiloComponent} from "./profilo/profilo.component";
import {SafeHtmlPipe} from "./safe-html-pipe/safe-html-pipe.component";
import { Page404Component } from './page404/page404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecaptchaComponent } from './recaptcha/recaptcha.component';


@NgModule({
  declarations: [
    AppComponent,
    BarraNavigazioneComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    TorneiComponent,
    ClassificaComponent,
    TorneoShowComponent,
    RowComponent,
    PartitaShowComponent,
    AddTorneoComponent,
    TorneiStatoComponent,
    TorneoComponent,
    SearchResultsComponent,
    StatisticheComponent,
    SignInComponent,
    MapsComponent,
    ProfiloPubblicoComponent,
    PartitaComponent,
    RichiestaComponent,
    AddPartitaComponent,
    AnteprimaProfiloComponent,
    TutteLePartiteComponent,
    AmiciComponent,
    ModificaDatiComponent,
    ModificaPasswordComponent,
    FooterComponent,
    AnteprimaTorneoComponent,
    TabDiRicercaComponent,
    CreaPgnComponent,
    ProfiloComponent,
    SafeHtmlPipe,
    Page404Component,
    RecaptchaComponent,
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        GoogleMapsModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule
    ],
  providers: [
    TorneoService,
    UtentiService,
    PartitaService,
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
