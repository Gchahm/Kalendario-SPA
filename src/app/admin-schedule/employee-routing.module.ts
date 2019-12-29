import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EmployeesPageComponent} from './pages/employees/employees-page.component';
import {ServicesPageComponent} from './pages/services/services-page.component';
import {AppointmentDashboardPageComponent} from './pages/appointment-dashboard/appointment-dashboard-page.component';
import {CanViewEmployeesGuard} from './guards/can-view-employees.guard';
import {CanViewServicesGuard} from './guards/can-view-services.guard';
import {CanBookAppointments} from './guards/can-book-appointments.service';
import {CanViewShiftsGuard} from './guards/can-view-shifts-guard.service';
import {ShiftsPageComponent} from './pages/shifts-page/shifts-page.component';

const routes: Routes = [
  {
    path: 'employee/schedule',
    component: AppointmentDashboardPageComponent,
    canActivate: [CanBookAppointments]
  },
  {
    path: 'admin/employees',
    component: EmployeesPageComponent,
    canActivate: [CanViewEmployeesGuard],
  },
  {
    path: 'admin/services',
    component: ServicesPageComponent,
    canActivate: [CanViewServicesGuard]
  },
  {
    path: 'admin/shifts',
    component: ShiftsPageComponent,
    canActivate: [CanViewShiftsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
