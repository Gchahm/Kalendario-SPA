import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {NotLoggedInGuard} from '../auth/guards/not-logged-in.guard';
import {AuthGuard} from '@shared/../auth/guards/auth.guard';
import {ConfirmEmailPageComponent} from '../auth/pages/confirm-email-page/confirm-email-page.component';
import {ResendConfirmationComponent} from '../auth/containers/resend-confirmation/resend-confirmation.component';
import {LoginRegisterPageComponent} from '@core/../auth/pages/login-register-page/login-register-page.component';

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
    component: ConfirmEmailPageComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
