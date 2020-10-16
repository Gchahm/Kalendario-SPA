import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {EmployeeRoutingModule} from '@app/employee/employee-routing.module';
import {EmployeeHomeComponent} from '@app/employee/components/employee-home/employee-home.component';
import {EmployeeSchedulePageComponent} from './pages/employee-schedule-page/employee-schedule-page.component';
import {EmployeeScheduleComponent} from './components/employee-schedule/employee-schedule.component';
import {ScheduleAppointmentComponent} from './components/schedule-appointment/schedule-appointment.component';
import {EmployeeDashboardShellComponent} from '@app/employee/containers/employee-dashboard-shell/employee-dashboard-shell.component';
import {AdminAppointmentsModule} from '@app/admin-appointments/admin-appointments.module';


@NgModule({
  declarations: [
    EmployeeDashboardShellComponent,
    EmployeeHomeComponent,
    EmployeeSchedulePageComponent,
    EmployeeScheduleComponent,
    ScheduleAppointmentComponent,
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule,
    AdminAppointmentsModule,
  ]
})
export class EmployeeModule {
}
