import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
