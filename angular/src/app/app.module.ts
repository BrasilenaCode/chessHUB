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
import { ProfiloComponent } from './profilo/profilo.component';
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

@NgModule({
  declarations: [
    AppComponent,
    BarraNavigazioneComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    TorneiComponent,
    ClassificaComponent,
    ProfiloComponent,
    TorneoShowComponent,
    RowComponent,
    PartitaShowComponent,
    AddTorneoComponent,
    TorneiStatoComponent,
    TorneoComponent,
    SearchResultsComponent,
    StatisticheComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule
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
