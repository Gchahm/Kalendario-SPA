import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeDetailComponent} from './components/employee-detail/employee-detail.component';
import {EmployeeListComponent} from './components/employee-list/employee-list.component';

const routes: Routes = [
  {
    path: 'staff/:id',
    component: EmployeeDetailComponent
  },
  {
    path: 'staff',
    component: EmployeeListComponent
  },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffServicesRoutingModule { }
