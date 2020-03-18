import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EmployeesPageComponent} from './components/_lists/employees/employees-page.component';
import {ServicesPageComponent} from './components/_lists/services/services-page.component';
import {AppointmentDashboardComponent} from './components/appointment-dashboard/appointment-dashboard.component';
import {CanViewEmployeesGuard} from './guards/can-view-employees.guard';
import {CanViewServicesGuard} from './guards/can-view-services.guard';
import {CanBookAppointments} from './guards/can-book-appointments.service';
import {CanViewShiftsGuard} from './guards/can-view-shifts-guard.service';
import {ShiftsPageComponent} from './components/_lists/shifts/shifts-page.component';
import {SchedulePageComponent} from './components/_lists/schedules/schedule-page.component';
import {CanViewSchedulesGuard} from './guards/can-view-schedules.guard';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {HomeComponent} from './components/home/home.component';
import {CustomersPageComponent} from './components/_lists/customers/customers-page.component';
import {CanViewCustomersGuard} from './guards/can-view-customers.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'employees',
        component: EmployeesPageComponent,
        canActivate: [CanViewEmployeesGuard],
      },
      {
        path: 'services',
        component: ServicesPageComponent,
        canActivate: [CanViewServicesGuard]
      },
      {
        path: 'shifts',
        component: ShiftsPageComponent,
        canActivate: [CanViewShiftsGuard]
      },
      {
        path: 'schedules',
        component: SchedulePageComponent,
        canActivate: [CanViewSchedulesGuard]
      },
      {
        path: 'customers',
        component: CustomersPageComponent,
        canActivate: [CanViewCustomersGuard]
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'appointments',
        component: AppointmentDashboardComponent,
        canActivate: [CanBookAppointments]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
