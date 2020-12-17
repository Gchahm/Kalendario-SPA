import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashBoardRoute} from '@shared/components/dashboard-container/dashboard-container.component';
import {EmployeeSchedulePageComponent} from '@app/employee/pages/employee-schedule-page/employee-schedule-page.component';
import {IsEmployeeGuard} from '@app/employee/guards/is-employee.guard';

const routes: DashBoardRoute[] = [
  {
    path: '',
    icon: '',
    component: EmployeeSchedulePageComponent,
    canActivate: [IsEmployeeGuard],

  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})export class EmployeeRoutingModule {
}
