import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CustomerAdminClient} from '@api/clients';
import {Customer, ICustomer} from '@api/models';
import {ApiError} from '@api/Errors';

@Component({
  selector: 'admin-create-customer-dialog',
  templateUrl: './create-customer-dialog.component.html',
  styleUrls: ['./create-customer-dialog.component.scss']
})
export class CreateCustomerDialogComponent implements OnInit {

  model: ICustomer;
  error: ApiError;

  constructor(private dialogRef: MatDialogRef<CreateCustomerDialogComponent>,
              private customerClient: CustomerAdminClient) {
  }

  ngOnInit() {
    this.model = Customer.fromJs();
  }

  saveModel(customer) {
    this.customerClient.post(customer)
      .toPromise()
      .then(r => this.dialogRef.close(r))
      .catch(error => this.error = error);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
