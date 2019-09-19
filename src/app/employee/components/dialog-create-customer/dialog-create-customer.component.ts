import {Component, Inject} from '@angular/core';
import {CreateCustomer} from '../../../shared/services/customer.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'employee-dialog-create-customer',
  templateUrl: './dialog-create-customer.component.html',
  styleUrls: ['./dialog-create-customer.component.css']
})
export class DialogCreateCustomerComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogCreateCustomerComponent>,
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
