import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {IsEmployeeGuard} from './guards/is-employee.guard';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'employee-dashboard',
    component: DashboardComponent,
    canActivate: [IsEmployeeGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
