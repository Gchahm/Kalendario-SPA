import {RouterModule, Routes} from '@angular/router';
import {EmployeeDashboardComponent} from './components/employee-dashboard/employee-dashboard.component';
import {IsEmployeeGuard} from './guards/is-employee.guard';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'employee-dashboard',
    component: EmployeeDashboardComponent,
    canActivate: [IsEmployeeGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
