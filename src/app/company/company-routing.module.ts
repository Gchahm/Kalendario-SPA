import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CompanyShellComponent} from '@company/containers/company-shell/company-shell.component';
import {EmployeeListPageComponent} from '@company/containers/employee-list-page/employee-list-page.component';
import {EmployeeDetailsPageComponent} from '@company/pages/employee-details-page/employee-details-page.component';
import {LandingPageComponent} from '@company/pages/landing-page/landing-page.component';
import {CartPageComponent} from '@company/pages/cart-page/cart-page.component';
import {AuthGuard} from '@shared/guards/auth.guard';

const routes: Routes = [

  {
    path: ':cid',
    component: CompanyShellComponent,
    children: [
      {
        path: 'staff',
        component: EmployeeListPageComponent
      },
      {
        path: 'staff/:id',
        component: EmployeeDetailsPageComponent
      },
      {
        path: 'cart',
        component: CartPageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        component: LandingPageComponent
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
