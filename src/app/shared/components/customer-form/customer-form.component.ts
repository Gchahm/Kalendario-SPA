import {Component} from '@angular/core';
import {BaseFormComponent} from '@shared/common/BaseFormComponent';
import {Customer, ICustomerWriteModel} from '@api/models';

@Component({
  selector: 'admin-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent extends BaseFormComponent<Customer> {

  writeModel(): ICustomerWriteModel {
    return {
      id: this.model.id,
      firstName: this.model.firstName,
      lastName: this.model.lastName,
      email: this.model.email,
      phone: this.model.phone,
    };
  }
}
