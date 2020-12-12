import {AuthGuard} from '@shared/guards/auth.guard';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RequestsPageComponent} from '@customers/pages/requests-page/requests-page.component';
import {ProfilePageComponent} from '@customers/pages/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: 'requests',
    component: RequestsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {
}
