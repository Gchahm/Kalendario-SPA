import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashBoardRoute} from '@shared/components/dashboard-container/dashboard-container.component';
import {employeeDashboardRoutes} from '@app/employee/employee-dashboard-routes';
import {EmployeeDashboardShellComponent} from '@app/employee/containers/employee-dashboard-shell/employee-dashboard-shell.component';

const routes: DashBoardRoute[] = [
  {
    path: '',
    icon: '',
    component: EmployeeDashboardShellComponent,
    children: employeeDashboardRoutes
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})export class EmployeeRoutingModule {
}
