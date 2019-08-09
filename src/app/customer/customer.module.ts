import { NgModule } from '@angular/core';
import {CustomerAppointmentsComponent} from './components/customer-appointments/customer-appointments.component';
import {BookAppointmentComponent} from './components/book-appointment/book-appointment.component';
import {AppointmentCardComponent} from './components/appointment-card/appointment-card.component';
import {SharedModule} from '../shared/shared.module';
import {CustomerRoutingModule} from './components/customer-routing.module';



@NgModule({
  declarations: [
    CustomerAppointmentsComponent,
    BookAppointmentComponent,
    AppointmentCardComponent,
  ],
  imports: [
    CustomerRoutingModule,
    SharedModule,
  ]
})
export class CustomerModule { }
