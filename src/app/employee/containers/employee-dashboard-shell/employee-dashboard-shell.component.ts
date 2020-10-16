import {Component} from '@angular/core';
import {DashBoardRoute} from '@shared/components/dashboard-container/dashboard-container.component';
import {employeeDashboardRoutes} from '@app/employee/employee-dashboard-routes';

@Component({
  selector: 'employee-dashboard',
  templateUrl: './employee-dashboard-shell.component.html',
  styleUrls: ['./employee-dashboard-shell.component.css']
})
export class EmployeeDashboardShellComponent {
  routes: DashBoardRoute[];

  constructor() {
    this.routes = employeeDashboardRoutes;
  }
}
