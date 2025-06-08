import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '@shared/../auth/guards/auth.guard';
import {LoginRegisterPageComponent} from '@core/../auth/pages/login-register-page/login-register-page.component';
import {NotLoggedInGuard} from '@app/auth/guards/not-logged-in.guard';
import {ConfirmEmailPageComponent} from '@app/auth/pages/confirm-email-page/confirm-email-page.component';
import {ResendConfirmationComponent} from '@app/auth/containers/resend-confirmation/resend-confirmation.component';
import {ProfilePageComponent} from '@app/auth/pages/profile-page/profile-page.component';
import {ResetPasswordRequestPageComponent} from '@app/auth/pages/reset-password-request-page/reset-password-request-page.component';
import {ResetPasswordConfirmPageComponent} from '@app/auth/pages/reset-password-confirm-page/reset-password-confirm-page.component';

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
    path: 'password-reset/confirm/:uidb64/:token',
    component: ResetPasswordConfirmPageComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'reset-password',
    component: ResetPasswordRequestPageComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'resend-confirm-email/:when',
    component: ResendConfirmationComponent,
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
export class AuthRoutingModule {
}
