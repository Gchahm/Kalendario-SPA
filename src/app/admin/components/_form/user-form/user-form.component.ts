import {Component, Input} from '@angular/core';
import {BaseFormComponent} from '@shared/common/BaseFormComponent';
import {Employee, Group, User} from '@api/models';
import {IUserWriteModel} from '@api/models/User';

@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends BaseFormComponent<User> {
  @Input() groups: Group[];
  @Input() employees: Employee[];

  writeModel(): IUserWriteModel {
    return {
      id: this.model.id,
      firstName: this.model.firstName,
      lastName: this.model.lastName,
      email: this.model.email,
      employee: this.model.employee.id,
      groups: this.model.groups
    };
  }
}
