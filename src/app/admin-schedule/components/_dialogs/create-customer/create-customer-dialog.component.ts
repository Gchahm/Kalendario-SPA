import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CreateDialogComponent} from '../../../../core/generics/components/CreateDialogComponent';
import {Customer} from '../../../../core/models/Customer';

@Component({
  selector: 'admin-create-customer-dialog',
  templateUrl: './create-customer-dialog.component.html',
  styleUrls: ['./create-customer-dialog.component.css']
})
export class CreateCustomerDialogComponent extends CreateDialogComponent {

  model = new Customer();

  constructor(dialogRef: MatDialogRef<CreateCustomerDialogComponent>) {
    super(dialogRef);
  }
}
