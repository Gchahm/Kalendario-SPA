import {Component, Input} from '@angular/core';
import {BaseFormComponent} from '@shared/common/BaseFormComponent';
import {Employee, EmployeeWriteModel, Schedule} from '@api/models';
import {CheckChanged} from '@admin/components/_form/CheckBoxForm';
import {ServiceFullModel} from '@app/admin-services/state';

@Component({
  selector: 'admin-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent extends BaseFormComponent<Employee> {
  @Input() services: ServiceFullModel[];
  @Input() schedules: Schedule[];

  changed(event: CheckChanged) {
    if (event.checked) {
      this.form.patchValue({
        services: [...this.form.value.services, event.id]
      });
    } else {
      this.form.patchValue({
        services: this.form.value.services.filter(id => id !== event.id)
      });
    }
  }

  writeModel(): EmployeeWriteModel {
    return {
      id: this.model.id,
      private: this.model.private,
      firstName: this.model.firstName,
      lastName: this.model.lastName,
      email: this.model.email,
      phone: this.model.phone,
      schedule: this.model.schedule,
      instagram: this.model.instagram,
      bio: this.model.bio,
      services: this.model.services
    };
  }
}


