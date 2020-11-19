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


@NgModule({
  declarations: [
    CustomerAppointmentsTableComponent,
    CustomerRwComponent,
    CustomerViewShellComponent,
    CustomerAppointmentsShellComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromCustomers.storeName, fromCustomers.reducer),
    EffectsModule.forFeature([
      CustomersEffects,
    ])
  ],
  exports: [
    CustomerViewShellComponent,
  ]
})
export class AdminCustomersModule {
}
