import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {CoreRoutingModule} from './core-routing.module';
import {CreateCompanyComponent} from '@admin/containers/_dialogs/create-company/create-company.component';
import {ConfirmEmailComponent} from './components/confirm-email/confirm-email.component';
import {ResendConfirmationComponent} from './components/resend-confirmation/resend-confirmation.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CoreEffects} from '@core/state/core.effects';
import * as fromCore from './state/core.reducer';
import { LoginRegisterPageComponent } from './pages/login-register-page/login-register-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarShellComponent } from './containers/navbar-shell/navbar-shell.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    CreateCompanyComponent,
    ConfirmEmailComponent,
    ResendConfirmationComponent,
    LoginRegisterPageComponent,
    FooterComponent,
    NavbarShellComponent,
  ],
  imports: [
    SharedModule,
    CoreRoutingModule,
    StoreModule.forFeature('core', fromCore.reducer),
    EffectsModule.forFeature([CoreEffects])
  ],
  exports: [
    NavbarShellComponent,
    FooterComponent,
  ]
})
export class CoreModule {
}
