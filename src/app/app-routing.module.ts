import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {EmployeeListComponent} from './components/employee-list/employee-list.component';
import {EmployeeDetailComponent} from './components/employee-detail/employee-detail.component';


const routes: Routes = [
  {
    path: 'staff/:id',
    component: EmployeeDetailComponent
  },
  {
    path: 'staff',
    component: EmployeeListComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
