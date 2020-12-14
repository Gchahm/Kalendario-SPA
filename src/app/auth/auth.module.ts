import { NgModule } from '@angular/core';
import {FacebookLoginShellComponent} from '@app/auth/containers/facebook-login-shell/facebook-login-shell.component';
import {SharedModule} from '@shared/shared.module';
import {LoginComponent} from '@app/auth/components/login/login.component';
import {RegisterComponent} from '@app/auth/components/register/register.component';
import {LoginRegisterShellComponent} from '@app/auth/containers/login-register-shell/login-register-shell.component';
import {LoginRegisterPageComponent} from '@app/auth/pages/login-register-page/login-register-page.component';
import {ConfirmEmailPageComponent} from '@app/auth/pages/confirm-email-page/confirm-email-page.component';
import {ResendConfirmationComponent} from '@app/auth/containers/resend-confirmation/resend-confirmation.component';
import {ProfilePageComponent} from '@app/auth/pages/profile-page/profile-page.component';
import {UserDetailsComponent} from '@app/auth/components/user-details/user-details.component';
import {AuthRoutingModule} from '@app/auth/auth-routing.module';
import { ChangePasswordShellComponent } from './containers/change-password-shell/change-password-shell.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FacebookConnectShellComponent } from './containers/facebook-connect-shell/facebook-connect-shell.component';
import { FacebookButtonComponent } from './components/facebook-button/facebook-button.component';
import { SocialAccountsShellComponent } from './containers/social-providers-shell/social-accounts-shell.component';
import { SocialAccountsComponent } from './components/social-providers-list/social-accounts.component';
import { ResetPasswordRequestPageComponent } from './pages/reset-password-request-page/reset-password-request-page.component';
import { ResetPasswordRequestFormComponent } from './components/reset-password-request-form/reset-password-request-form.component';
import { ResetPasswordConfirmPageComponent } from './pages/reset-password-confirm-page/reset-password-confirm-page.component';
import { ResetPasswordConfirmFormComponent } from './components/reset-password-confirm-form/reset-password-confirm-form.component';
import { UserVerifiedComponent } from './components/user-verified/user-verified.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    UserDetailsComponent,

    LoginRegisterShellComponent,
    FacebookLoginShellComponent,
    ChangePasswordShellComponent,
    ResendConfirmationComponent,
    ConfirmEmailPageComponent,
    FacebookConnectShellComponent,

    LoginRegisterPageComponent,
    ProfilePageComponent,
    FacebookButtonComponent,
    SocialAccountsShellComponent,
    SocialAccountsComponent,
    ResetPasswordRequestPageComponent,
    ResetPasswordRequestFormComponent,
    ResetPasswordConfirmPageComponent,
    ResetPasswordConfirmFormComponent,
    UserVerifiedComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
  exports: [
    LoginRegisterShellComponent
  ]
})
export class AuthModule { }
