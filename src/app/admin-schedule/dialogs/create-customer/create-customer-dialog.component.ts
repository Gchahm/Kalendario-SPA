import {Component, Inject} from '@angular/core';
import {CreateCustomer} from '../../../shared/services/customer.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'admin-create-customer-dialog',
  templateUrl: './create-customer-dialog.component.html',
  styleUrls: ['./create-customer-dialog.component.css']
})
export class CreateCustomerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateCustomer) {}

  form = new CreateForm();

  onNoClick(): void {
    this.dialogRef.close();
  }
}

class CreateForm {
  firstName: string;
  lastName: string;
  phone: string;

  createModel(): CreateCustomer {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      phone: this.phone
    };
  }
}
