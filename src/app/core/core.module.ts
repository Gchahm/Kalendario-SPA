import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RegisterComponent} from './components/register/register.component';
import {CoreRoutingModule} from './core-routing.module';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule,
    CoreRoutingModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
