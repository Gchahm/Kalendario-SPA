import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin-schedule/admin-schedule.module').then(m => m.AdminScheduleModule)
  },
  {
    path: 'c',
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
