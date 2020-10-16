import {Component, Input} from '@angular/core';
import {BaseFormComponent} from '@shared/common/BaseFormComponent';
import {Group, IGroupWriteModel, Permission} from '@api/models';
import {CheckChanged} from '@admin/components/_form/CheckBoxForm';

@Component({
  selector: 'admin-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent extends BaseFormComponent<Group> {
  @Input() permissions: Permission[];

  changed(event: CheckChanged) {
    if (event.checked) {
      this.form.patchValue({
        permissions: [...this.form.value.permissions, event.id]
      });
    } else {
      this.form.patchValue({
        permissions: this.form.value.permissions.filter(id => id !== event.id)
      });
    }
  }

  writeModel(): IGroupWriteModel {
    return {
      id: this.model.id,
      name: this.model.name,
      permissions: this.model.permissions
    };
  }
}
