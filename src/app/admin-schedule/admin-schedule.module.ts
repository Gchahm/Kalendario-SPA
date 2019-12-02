import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {EmployeeRoutingModule} from './employee-routing.module';
import {CalendarModule} from '../calendar/calendar.module';
import { AppointmentEventComponent } from './components/appointment-event/appointment-event.component';
import { FormAppointmentComponent } from './components/form-appointment/form-appointment.component';
import { AppointmentRequestsComponent } from './components/appointment-requests/appointment-requests.component';
import { CancelModalComponent } from './components/cancel-modal/cancel-modal.component';
import { FormSelfAppointmentComponent } from './components/form-self-appointment/form-self-appointment.component';
import {ScheduleViewComponent} from './components/schedule-view/schedule-view.component';
import {ServicesPageComponent} from './pages/services/services-page.component';
import {EmployeesPageComponent} from './pages/employees/employees-page.component';
import {DashboardSideBarComponent} from './components/dashboard-side-bar/dashboard-side-bar.component';
import {CustomerListDialogComponent} from './dialogs/customer-list/customer-list-dialog.component';
import {CreateCustomerDialogComponent} from './dialogs/create-customer/create-customer-dialog.component';
import {CreateEmployeeDialogComponent} from './dialogs/create-employee/create-employee-dialog.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {AppointmentDashboardPageComponent} from './pages/appointment-dashboard/appointment-dashboard-page.component';
import {EmployeePanelComponent} from './components/employee-panel/employee-panel.component';
import {ServiceCardComponent} from './components/service-card/service-card.component';
import { CreateServiceDialogComponent } from './dialogs/create-service/create-service-dialog.component';
import { ShiftsPageComponent } from './pages/shifts-page/shifts-page.component';
import { ShiftDetailComponent } from './components/shift-detail/shift-detail.component';
import { CreateShiftDialogComponent } from './dialogs/create-shift/create-shift-dialog.component';


@NgModule({
  declarations: [
    CancelModalComponent,
    AppointmentDashboardPageComponent,
    ScheduleViewComponent,
    AppointmentEventComponent,
    FormAppointmentComponent,
    AppointmentRequestsComponent,
    FormSelfAppointmentComponent,
    DashboardSideBarComponent,

    EmployeePanelComponent,
    ServiceCardComponent,

    CustomerListDialogComponent,
    CreateCustomerDialogComponent,
    CreateEmployeeDialogComponent,

    ServicesPageComponent,
    EmployeesPageComponent,
    AdminDashboardComponent,
    CreateServiceDialogComponent,
    ShiftsPageComponent,
    ShiftDetailComponent,
    CreateShiftDialogComponent,
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule,
    CalendarModule,
  ],
  bootstrap: [
    CancelModalComponent,
    CreateCustomerDialogComponent,
    CustomerListDialogComponent,
    CreateEmployeeDialogComponent,
    CreateServiceDialogComponent
  ]
})
export class AdminScheduleModule {
}
