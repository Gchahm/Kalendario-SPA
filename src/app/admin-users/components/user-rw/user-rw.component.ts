import {Component, Input} from '@angular/core';
import {BaseRWComponent} from '@shared/common/BaseRWComponent';
import {IEmployee, IGroup, IUserWriteModel, IUser} from '@api/models';
import {CheckChanged} from '@admin/components/_form/CheckBoxForm';
import {UserViewModel} from '@app/admin-users/state';

@Component({
  selector: 'admin-user-rw',
  templateUrl: './user-rw.component.html',
  styleUrls: ['./user-rw.component.css']
})
export class UserRwComponent extends BaseRWComponent<UserViewModel> {
  @Input() groups: IGroup[];
  @Input() employees: IEmployee[];

  writeModel(): IUserWriteModel {
    return {
      id: this.model.id,
      firstName: this.model.firstName,
      lastName: this.model.lastName,
      email: this.model.email,
      employeeId: this.model.employeeId,
      groups: this.model.groups
    };
  }

  changed(event: CheckChanged) {
    if (event.checked) {
      this.form.patchValue({
        groups: [...this.form.value.groups, event.id]
      });
    } else {
      this.form.patchValue({
        groups: this.form.value.groups.filter(id => id !== event.id)
      });
    }
  }
}
