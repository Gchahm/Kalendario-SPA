import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../shared/guards/auth.guard';
import {DashboardPageComponent} from './components/dashboard-page/dashboard-page.component';

const routes: Routes = [
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
