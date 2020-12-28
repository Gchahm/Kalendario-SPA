import {NgModule} from '@angular/core';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {SharedModule} from '@shared/shared.module';
import {LandingRoutingModule} from '@app/landing/landing-routing.module';
import {FeatureCardComponent} from './components/feature-card/feature-card.component';
import {CreateCompanyComponent} from '@app/landing/containers/create-company/create-company.component';
import {AuthModule} from '@app/auth/auth.module';


@NgModule({
  declarations: [LandingPageComponent, FeatureCardComponent, CreateCompanyComponent],
  imports: [
    LandingRoutingModule,
    SharedModule,
    AuthModule
  ]
})
export class LandingModule {
}
