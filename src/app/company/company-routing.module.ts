import {EmployeeListPageComponent} from './components/employee-list-page/employee-list-page.component';
import {EmployeeDetailPageComponent} from './components/employee-detail-page/employee-detail-page.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CompanyComponent} from './components/company/company.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {BookAppointmentPageComponent} from './components/book-appointment-page/book-appointment-page.component';

const routes: Routes = [
  {
    path: ':cid',
    component: CompanyComponent,
    children: [
      {
        path: 'staff',
        component: EmployeeListPageComponent
      },
      {
        path: 'staff/:id',
        component: EmployeeDetailPageComponent
      },
      {
        path: 'booking/:employee/:service/:date',
        component: BookAppointmentPageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        component: EmployeeListPageComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {
}
