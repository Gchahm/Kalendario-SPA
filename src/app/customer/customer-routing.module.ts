import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeDetailPageComponent} from './components/employee-detail-page/employee-detail-page.component';
import {EmployeeListPageComponent} from './components/employee-list-page/employee-list-page.component';
import {BookAppointmentPageComponent} from './components/book-appointment-page/book-appointment-page.component';
import {AuthGuard} from './guards/auth.guard';
import {DashboardPageComponent} from './components/dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: 'booking/:employee/:service/:date',
    component: BookAppointmentPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-appointments',
    component: DashboardPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'staff/:id',
    component: EmployeeDetailPageComponent
  },
  {
    path: 'staff',
    component: EmployeeListPageComponent
  },
  {
    path: '',
    component: EmployeeListPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
