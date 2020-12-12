import { NgModule } from '@angular/core';
import {FacebookLoginShellComponent} from '@app/auth/containers/facebook-login-shell/facebook-login-shell.component';
import {SharedModule} from '@shared/shared.module';
import {LoginComponent} from '@app/auth/components/login/login.component';
import {RegisterComponent} from '@app/auth/components/register/register.component';
import {LoginRegisterShellComponent} from '@app/auth/containers/login-register-shell/login-register-shell.component';
import {LoginRegisterPageComponent} from '@app/auth/pages/login-register-page/login-register-page.component';
import {ConfirmEmailComponent} from '@app/auth/components/confirm-email/confirm-email.component';
import {ResendConfirmationComponent} from '@app/auth/containers/resend-confirmation/resend-confirmation.component';
import {ProfilePageComponent} from '@app/auth/pages/profile-page/profile-page.component';
import {UserDetailsComponent} from '@app/auth/components/user-details/user-details.component';
import {AuthRoutingModule} from '@app/auth/auth-routing.module';
import { ChangePasswordShellComponent } from './containers/change-password-shell/change-password-shell.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {FormComponent} from '@app/auth/commom/form.component';


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
    ConfirmEmailComponent,

    LoginRegisterPageComponent,
    ProfilePageComponent,
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
