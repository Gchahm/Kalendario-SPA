import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RegisterComponent} from './components/register/register.component';
import {CoreRoutingModule} from './core-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
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
