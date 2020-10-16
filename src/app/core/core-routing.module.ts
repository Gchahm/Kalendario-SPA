import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {NotLoggedInGuard} from './guards/not-logged-in.guard';
import {AuthGuard} from '@shared/guards/auth.guard';
import {CreateCompanyComponent} from '@admin/containers/_dialogs/create-company/create-company.component';
import {ConfirmEmailComponent} from './components/confirm-email/confirm-email.component';
import {ResendConfirmationComponent} from './components/resend-confirmation/resend-confirmation.component';
import {LoginRegisterPageComponent} from '@core/pages/login-register-page/login-register-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginRegisterPageComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'register',
    component: LoginRegisterPageComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'account-confirm-email/:emailKey',
    component: ConfirmEmailComponent,
  },
  {
    path: 'resend-confirm-email/:when',
    component: ResendConfirmationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create-company',
    component: CreateCompanyComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
