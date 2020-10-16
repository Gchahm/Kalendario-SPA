import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import {Customer} from '@api/models';
import * as fromCustomers from '@app/admin-customers/state';
import {BaseCreateDialog} from '@admin/containers/_dialogs/BaseCreateDialog';

@Component({
  selector: 'admin-create-customer-dialog',
  templateUrl: './create-customer-dialog.component.html',
  styleUrls: ['./create-customer-dialog.component.scss']
})
export class CreateCustomerDialogComponent extends BaseCreateDialog<Customer> {

  constructor(dialogRef: MatDialogRef<CreateCustomerDialogComponent>,
              store: Store<State>) {
    super(dialogRef, store, fromCustomers.actions, fromCustomers.selectors);
  }
}
