import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {EmployeeRoutingModule} from '@app/employee/employee-routing.module';
import {EmployeeSchedulePageComponent} from './pages/employee-schedule-page/employee-schedule-page.component';
import {EmployeeSchedulePageContainerComponent} from './components/employee-schedule/employee-schedule-page-container.component';
import {ScheduleAppointmentComponent} from './components/schedule-appointment/schedule-appointment.component';
import {AdminAppointmentsModule} from '@app/admin-appointments/admin-appointments.module';
import { DateRoundButtonComponent } from './components/date-round-button/date-round-button.component';


@NgModule({
  declarations: [
    EmployeeSchedulePageComponent,
    EmployeeSchedulePageContainerComponent,
    ScheduleAppointmentComponent,
    DateRoundButtonComponent,
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule,
    AdminAppointmentsModule,
  ]
})
export class EmployeeModule {
}
