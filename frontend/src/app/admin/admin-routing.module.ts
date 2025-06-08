import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminDashboardComponent} from './containers/admin-dashboard/admin-dashboard.component';
import {adminDashboardRoutes} from '@admin/admin-dashboard-routes';
import {DashBoardRoute} from '@shared/components/dashboard-container/dashboard-container.component';

const routes: DashBoardRoute[] = [
  {
    path: '',
    icon: '',
    component: AdminDashboardComponent,
    children: adminDashboardRoutes
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
