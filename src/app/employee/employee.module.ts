import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {EmployeeRoutingModule} from './employee-routing.module';
import {CalendarModule} from '../calendar/calendar.module';
import { EmployeeAppointmentsComponent } from './components/employee-appointments/employee-appointments.component';
import { AppointmentEventComponent } from './components/appointment-event/appointment-event.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';



@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeAppointmentsComponent,
    AppointmentEventComponent,
    AppointmentFormComponent
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule,
    CalendarModule,
  ]
})
export class EmployeeModule { }
