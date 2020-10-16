import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import * as fromCustomers from '@app/admin-customers/state';
import {SharedModule} from '@shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {CustomersEffects} from '@app/admin-customers/state/customers.effects';
import {CustomerInputComponent} from '@app/admin-appointments/containers/customer-input/customer-input.component';
import {CreateCustomerDialogComponent} from '@app/admin-customers/containers/create-customer/create-customer-dialog.component';
import {CustomerFormComponent} from '@app/admin-customers/components/customer-form/customer-form.component';


@NgModule({
  declarations: [
    CreateCustomerDialogComponent,
    CustomerFormComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromCustomers.storeName, fromCustomers.reducer),
    EffectsModule.forFeature([
      CustomersEffects,
    ])
  ],
  exports: [
    CustomerFormComponent,
  ]
})
export class AdminCustomersModule {
}
