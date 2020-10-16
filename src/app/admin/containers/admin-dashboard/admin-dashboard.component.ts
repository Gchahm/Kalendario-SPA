import {Component} from '@angular/core';
import {adminDashboardRoutes} from '@admin/admin-dashboard-routes';
import {DashBoardRoute} from '@shared/components/dashboard-container/dashboard-container.component';


@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  routes: DashBoardRoute[];

  constructor() {
    this.routes = adminDashboardRoutes;
  }
}

