import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import {HttpClientModule} from '@angular/common/http';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AgendaEventComponent } from './components/agenda-event/agenda-event.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import {ErrorInterceptorProvider} from './services/error.interceptor';
import {AuthService} from './services/auth.service';
import {AlertifyService} from './services/alertify.service';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    EmployeeCardComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    AgendaComponent,
    AgendaEventComponent,
    RegisterComponent,
    BookAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FullCalendarModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    AlertifyService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
