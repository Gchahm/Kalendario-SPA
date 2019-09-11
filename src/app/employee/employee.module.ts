import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import {EmployeeRoutingModule} from './employee-routing.module';
import {CalendarModule} from '../calendar/calendar.module';
import { AppointmentEventComponent } from './components/appointment-event/appointment-event.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { AppointmentRequestsComponent } from './components/appointment-requests/appointment-requests.component';
import { EmployeeCalendarComponent } from './components/employee-calendar/employee-calendar.component';
import { CancelModalComponent } from './components/cancel-modal/cancel-modal.component';
import { SelfAppointmentFormComponent } from './components/self-appointment-form/self-appointment-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import {EmployeeAppointmentsComponent} from './components/employee-appointments/employee-appointments.component';



@NgModule({
  declarations: [
    EmployeeDashboardComponent,
    EmployeeAppointmentsComponent,
    AppointmentEventComponent,
    AppointmentFormComponent,
    AppointmentRequestsComponent,
    EmployeeCalendarComponent,
    CancelModalComponent,
    SelfAppointmentFormComponent,
    ProfileComponent,
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule,
    CalendarModule,
  ],
  bootstrap: [CancelModalComponent]
})
export class EmployeeModule { }
