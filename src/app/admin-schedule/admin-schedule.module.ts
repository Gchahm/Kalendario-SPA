import { NgModule } from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {CalendarModule} from '../calendar/calendar.module';
import { AppointmentEventDialogComponent } from './components/_dialogs/appointment-event/appointment-event-dialog.component';
import { AppointmentRequestsDialogComponent } from './components/_dialogs/appointment-requests/appointment-requests-dialog.component';
import {ScheduleViewComponent} from './components/_lists/schedule-view/schedule-view.component';
import {ServicesPageComponent} from './components/_lists/services/services-page.component';
import {EmployeesPageComponent} from './components/_lists/employees/employees-page.component';
import {CreateCustomerDialogComponent} from './components/_dialogs/create-customer/create-customer-dialog.component';
import {CreateEmployeeDialogComponent} from './components/_dialogs/create-employee/create-employee-dialog.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {AppointmentDashboardComponent} from './components/appointment-dashboard/appointment-dashboard.component';
import { CreateServiceDialogComponent } from './components/_dialogs/create-service/create-service-dialog.component';
import { ShiftsPageComponent } from './components/_lists/shifts/shifts-page.component';
import { CreateShiftDialogComponent } from './components/_dialogs/create-shift/create-shift-dialog.component';
import {CreateAppointmentDialogComponent} from './components/_dialogs/create-appointment/create-appointment-dialog.component';
import { SchedulePageComponent } from './components/_lists/schedules/schedule-page.component';
import { CreateScheduleDialogComponent } from './components/_dialogs/create-schedule/create-schedule-dialog.component';
import { AdminHomeComponent } from './components/home/admin-home.component';
import { ModelListContainerComponent } from './components/model-list-container/model-list-container.component';
import { EmployeeFormComponent } from './components/_forms/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './components/_details/employee-details/employee-details.component';
import { ShiftFormComponent } from './components/_forms/shift-form/shift-form.component';
import {ShiftDetailsComponent} from './components/_details/shift-details/shift-details.component';
import { ServiceFormComponent } from './components/_forms/service-form/service-form.component';
import {ServiceDetailsComponent} from './components/_details/service-details/service-details.component';
import { ScheduleFormComponent } from './components/_forms/schedule-form/schedule-form.component';
import {ScheduleDetailsComponent} from './components/_details/schedule-details/schedule-details.component';
import { AppointmentFormComponent } from './components/_forms/appointment-form/appointment-form.component';
import { AppointmentDetailsComponent } from './components/_details/appointment-details/appointment-details.component';
import { SelfAppointmentFormComponent } from './components/_forms/self-appointment-form/self-appointment-form.component';
import { SelfAppointmentDetailsComponent } from './components/_details/self-appointment-details/self-appointment-details.component';
import { CustomersPageComponent } from './components/_lists/customers/customers-page.component';
import { CustomerDetailsComponent } from './components/_details/customer-details/customer-details.component';
import { CustomerFormComponent } from './components/_forms/customer-form/customer-form.component';


@NgModule({
  declarations: [
    AppointmentDashboardComponent,
    ScheduleViewComponent,
    AppointmentEventDialogComponent,
    AppointmentRequestsDialogComponent,

    ServicesPageComponent,
    ShiftsPageComponent,
    SchedulePageComponent,
    EmployeesPageComponent,
    CustomersPageComponent,

    ServiceDetailsComponent,
    ShiftDetailsComponent,
    ScheduleDetailsComponent,
    EmployeeDetailsComponent,
    CustomerDetailsComponent,
    SelfAppointmentDetailsComponent,
    AppointmentDetailsComponent,

    ServiceFormComponent,
    ShiftFormComponent,
    ScheduleFormComponent,
    EmployeeFormComponent,
    AppointmentFormComponent,
    SelfAppointmentFormComponent,

    CreateServiceDialogComponent,
    CreateShiftDialogComponent,
    CreateScheduleDialogComponent,
    CreateEmployeeDialogComponent,

    CreateAppointmentDialogComponent,

    CreateCustomerDialogComponent,

    AdminDashboardComponent,
    AdminHomeComponent,
    ModelListContainerComponent,
    CustomerFormComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    CalendarModule,
  ],
  providers: [
  ],
  bootstrap: [
    CreateCustomerDialogComponent,
    CreateEmployeeDialogComponent,
    CreateServiceDialogComponent,
    CreateShiftDialogComponent,
    CreateScheduleDialogComponent,
    AppointmentEventDialogComponent,
    CreateAppointmentDialogComponent,
    AppointmentRequestsDialogComponent,
  ]
})
export class AdminScheduleModule {
}
