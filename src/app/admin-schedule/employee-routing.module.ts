import {RouterModule, Routes} from '@angular/router';
import {DashboardPageComponent} from './components/dashboard-page/dashboard-page.component';
import {IsEmployeeGuard} from './guards/is-employee.guard';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'employee/dashboard',
    component: DashboardPageComponent,
    canActivate: [IsEmployeeGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
