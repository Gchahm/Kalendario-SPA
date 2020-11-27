import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import * as fromCustomers from '@app/admin-customers/state';
import {SharedModule} from '@shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {CustomersEffects} from '@app/admin-customers/state/customers.effects';
import { CustomerRwComponent } from './components/customer-rw/customer-rw.component';
import { CustomerViewShellComponent } from './containers/customer-view-shell/customer-view-shell.component';
import {CustomerAppointmentsTableComponent} from '@app/admin-customers/components/customer-appointments-table/customer-appointments-table.component';
import {CustomerAppointmentsShellComponent} from '@app/admin-customers/containers/customer-appointments-shell/customer-appointments-shell.component';
import {CustomersPageComponent} from '@app/admin-customers/pages/customers-page/customers-page.component';
import {AdminSharedModule} from '@app/admin-shared/admin-shared.module';


@NgModule({
  declarations: [
    CustomerAppointmentsTableComponent,
    CustomerRwComponent,
    CustomerViewShellComponent,
    CustomerAppointmentsShellComponent,
    CustomersPageComponent,
  ],
  imports: [
    AdminSharedModule,
    StoreModule.forFeature(fromCustomers.storeName, fromCustomers.reducer),
    EffectsModule.forFeature([
      CustomersEffects,
    ])
  ]
})
export class AdminCustomersModule {
}
