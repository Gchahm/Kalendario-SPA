import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {EmployeeListComponent} from './components/employee-list/employee-list.component';
import {EmployeeDetailComponent} from './components/employee-detail/employee-detail.component';
import {RegisterComponent} from './components/register/register.component';
import {NotLoggedInGuard} from './guards/not-logged-in.guard';
import {BookAppointmentComponent} from './components/book-appointment/book-appointment.component';
import {AuthGuard} from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'staff/:id',
    component: EmployeeDetailComponent
  },
  {
    path: 'staff',
    component: EmployeeListComponent
  },
  {
    path: 'booking/:employee/:service/:date',
    component: BookAppointmentComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
