import {Component} from '@angular/core';
import {CreateDialogComponent} from '@core/generics/components/CreateDialogComponent';
import {Customer} from '@core/models/Customer';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'admin-create-customer-dialog',
  templateUrl: './create-customer-dialog.component.html',
  styleUrls: ['./create-customer-dialog.component.scss']
})
export class CreateCustomerDialogComponent extends CreateDialogComponent {

  model = new Customer();

  constructor(dialogRef: MatDialogRef<CreateCustomerDialogComponent>) {
    super(dialogRef);
  }
}
