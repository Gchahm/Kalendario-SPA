import {NgModule} from '@angular/core';
import {EmployeeListPageComponent} from './containers/employee-list-page/employee-list-page.component';
import {SharedModule} from '@shared/shared.module';
import {CalendarModule} from '../calendar/calendar.module';
import {CompanyRoutingModule} from './company-routing.module';

import * as fromCompany from '@company/state';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {CompanyEffects} from '@company/state/company.effects';
import {EmployeeListComponent} from './components/employee-list/employee-list.component';
import {CompanyShellComponent} from '@company/containers/company-shell/company-shell.component';
import {EmployeeDetailsPageComponent} from './pages/employee-details-page/employee-details-page.component';
import {EmployeeDetailsCardComponent} from './components/employee-details-card/employee-details-card.component';
import {SlotsForServiceComponent} from './components/slots-for-service/slots-for-service.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {EmployeeListCardComponent} from './components/employee-list-card/employee-list-card.component';
import {ServicesShellComponent} from './containers/services-shell/services-shell.component';
import {ServiceListComponent} from './components/service-list/service-list.component';
import {ServiceListCardComponent} from './components/service-list-card/service-list-card.component';
import {CarouselShellComponent} from './containers/carousel-shell/carousel-shell.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {EmployeeDetailsServicesComponent} from './components/employee-details-services/employee-details-services.component';
import {EmployeeDetailsServicesShellComponent} from './containers/employee-details-services-shell/employee-details-services-shell.component';
import {SlotsForServiceShellComponent} from './containers/slots-for-service-shell/slots-for-service-shell.component';
import {ServiceSlotComponent} from './components/service-slot/service-slot.component';
import {ServiceSlotShellComponent} from './containers/service-slot-shell/service-slot-shell.component';
import {SlotsForServiceDialogComponent} from './components/_dialogs/slots-for-service-dialog/slots-for-service-dialog.component';
import {CartPageComponent} from './pages/cart-page/cart-page.component';
import {CartSummaryComponent} from './components/cart-summary/cart-summary.component';
import {CompanyLogoShellComponent} from './containers/company-logo-shell/company-logo-shell.component';
import {RequestItemComponent} from '@company/components/request-item/request-item.component';
import {RequestComponent} from '@company/components/request/request.component';
import {StripeModule} from '@app/stripe/stripe.module';


@NgModule({
  declarations: [
    CompanyShellComponent,
    EmployeeListPageComponent,
    EmployeeListComponent,
    EmployeeDetailsPageComponent,
    EmployeeDetailsCardComponent,
    SlotsForServiceComponent,
    LandingPageComponent,
    EmployeeListCardComponent,
    ServicesShellComponent,
    ServiceListComponent,
    ServiceListCardComponent,
    CarouselShellComponent,
    CarouselComponent,
    EmployeeDetailsServicesComponent,
    EmployeeDetailsServicesShellComponent,
    SlotsForServiceShellComponent,
    ServiceSlotComponent,
    ServiceSlotShellComponent,
    SlotsForServiceDialogComponent,
    CartPageComponent,
    RequestComponent,
    RequestItemComponent,
    CartSummaryComponent,
    CompanyLogoShellComponent,
  ],
  imports: [
    CompanyRoutingModule,
    SharedModule,
    CalendarModule,
    StripeModule,
    StoreModule.forFeature(fromCompany.storeName, fromCompany.reducer),
    EffectsModule.forFeature([
      CompanyEffects
    ])
  ]
})
export class CompanyModule {
}
