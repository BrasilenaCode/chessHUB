import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { TorneiComponent } from './tornei/tornei.component';
import { ClassificaComponent } from './classifica/classifica.component';

const routes: Routes = [
  {"path": "", component: HomeComponent},
  {"path": "login", component: LoginComponent},
  {"path": "about", component: AboutComponent},
  {"path": "profilo", component: ProfiloComponent},
  {"path": "tornei", component: TorneiComponent},
  {"path": "classifica", component: ClassificaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }