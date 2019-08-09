import {RouterModule, Routes} from '@angular/router';
import {BookAppointmentComponent} from './book-appointment/book-appointment.component';
import {CustomerAppointmentsComponent} from './customer-appointments/customer-appointments.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'booking/:employee/:service/:date',
    component: BookAppointmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-appointments',
    component: CustomerAppointmentsComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
