import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestsComponent} from '@customers/components/requests/requests.component';
import {SharedModule} from '@shared/shared.module';
import {RequestCardComponent} from '@customers/components/request-card/request-card.component';
import {RequestsPageComponent} from './pages/requests-page/requests-page.component';
import {StoreModule} from '@ngrx/store';

import * as fromCustomers from '@customers/state';
import {EffectsModule} from '@ngrx/effects';
import {CustomersEffects} from '@customers/state/customers.effects';
import {CustomersRoutingModule} from '@customers/customers-routing.module';

@NgModule({
  declarations: [
    RequestsComponent,
    RequestCardComponent,
    RequestsPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomersRoutingModule,
    StoreModule.forFeature(fromCustomers.storeName, fromCustomers.reducer),
    EffectsModule.forFeature([CustomersEffects]),
  ]
})
export class CustomersModule {
}
