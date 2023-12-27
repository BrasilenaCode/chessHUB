import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

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
    TorneoShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
