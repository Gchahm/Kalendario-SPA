import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {EmployeeRoutingModule} from './employee-routing.module';
import {CalendarModule} from '../calendar/calendar.module';
import { AppointmentsListComponent } from './components/appointment-list/appointments-list.component';
import { AppointmentEventComponent } from './components/appointment-event/appointment-event.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { AppointmentRequestsComponent } from './components/appointment-requests/appointment-requests.component';
import { EmployeeCalendarComponent } from './components/employee-calendar/employee-calendar.component';
import { CancelModalComponent } from './components/cancel-modal/cancel-modal.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentsListComponent,
    AppointmentEventComponent,
    AppointmentFormComponent,
    AppointmentRequestsComponent,
    EmployeeCalendarComponent,
    CancelModalComponent
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule,
    CalendarModule,
  ],
  bootstrap: [CancelModalComponent]
})
export class EmployeeModule { }
