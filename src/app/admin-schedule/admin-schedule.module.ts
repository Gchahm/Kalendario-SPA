import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {EmployeeRoutingModule} from './employee-routing.module';
import {CalendarModule} from '../calendar/calendar.module';
import { AppointmentEventDialogComponent } from './dialogs/appointment-event/appointment-event-dialog.component';
import { AppointmentRequestsDialogComponent } from './dialogs/appointment-requests/appointment-requests-dialog.component';
import { CancelModalComponent } from './components/cancel-modal/cancel-modal.component';
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
import {CreateSelfAppointmentDialogComponent} from './dialogs/create-self-appointment/create-self-appointment-dialog.component';
import {CreateAppointmentDialogComponent} from './dialogs/create-appointment/create-appointment-dialog.component';


@NgModule({
  declarations: [
    CancelModalComponent,
    AppointmentDashboardPageComponent,
    ScheduleViewComponent,
    AppointmentEventDialogComponent,
    AppointmentRequestsDialogComponent,
    DashboardSideBarComponent,

    EmployeePanelComponent,
    ServiceCardComponent,

    CreateSelfAppointmentDialogComponent,
    CreateAppointmentDialogComponent,

    CustomerListDialogComponent,
    CreateCustomerDialogComponent,
    CreateEmployeeDialogComponent,
    CreateShiftDialogComponent,

    ServicesPageComponent,
    EmployeesPageComponent,
    AdminDashboardComponent,
    CreateServiceDialogComponent,
    ShiftsPageComponent,
    ShiftDetailComponent,
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
    CreateServiceDialogComponent,
    AppointmentEventDialogComponent,
    CreateAppointmentDialogComponent,
    CreateSelfAppointmentDialogComponent,
    AppointmentRequestsDialogComponent,
  ]
})
export class AdminScheduleModule {
}
