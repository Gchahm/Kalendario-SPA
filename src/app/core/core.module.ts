import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RegisterComponent} from './components/register/register.component';
import {CoreRoutingModule} from './core-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import {DashboardPageComponent} from './components/dashboard-page/dashboard-page.component';
import {AppointmentCardComponent} from './components/appointment-card/appointment-card.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    DashboardPageComponent,
    AppointmentCardComponent,
    CreateCompanyComponent,
  ],
  imports: [
    SharedModule,
    CoreRoutingModule
  ],
  exports: [
    NavbarComponent,
  ]
})
export class CoreModule { }
