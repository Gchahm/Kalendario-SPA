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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { ErrorInterceptorProvider} from './interceptors/error.interceptor';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { CustomerAppointmentsComponent } from './components/customer-appointments/customer-appointments.component';
import { AppointmentCardComponent } from './components/appointment-card/appointment-card.component';
import { AuthInterceptorProvider} from './interceptors/token.interceptor';
import {CalendarModule} from './calendar/calendar.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    EmployeeCardComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    RegisterComponent,
    BookAppointmentComponent,
    CustomerAppointmentsComponent,
    AppointmentCardComponent
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
    CalendarModule
  ],
  providers: [
    ErrorInterceptorProvider,
    AuthInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
