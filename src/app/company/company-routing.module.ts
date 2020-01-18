import {EmployeeListPageComponent} from './components/employee-list-page/employee-list-page.component';
import {EmployeeDetailPageComponent} from './components/employee-detail-page/employee-detail-page.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
  // {
  //   path: 'c/:cid',
  //   component: CompanyComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: EmployeeListPageComponent
  //     },
  //     {
  //       path: 'staff/:id',
  //       component: EmployeeDetailPageComponent
  //     },
  //   ]
  // },
  {
    path: 'c/:cid',
    component: EmployeeListPageComponent
  },
  {
    path: 'c/:cid/staff',
    component: EmployeeListPageComponent
  },
  {
    path: 'c/:cid/staff/:id',
    component: EmployeeDetailPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {
}
