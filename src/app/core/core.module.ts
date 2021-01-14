import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {CoreRoutingModule} from './core-routing.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CoreEffects} from '@core/state/core.effects';
import * as fromCore from './state/core.reducer';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarShellComponent } from './containers/navbar-shell/navbar-shell.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
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
