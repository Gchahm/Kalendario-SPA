import {Component, Input} from '@angular/core';
import {BaseRWComponent} from '@shared/common/BaseRWComponent';
import {EmployeeViewModel} from '@app/admin-employee/state';
import {EmployeeWriteModel, ISchedule} from '@api/models';
import {CheckChanged} from '@admin/components/_form/CheckBoxForm';
import {ServiceFullModel} from '@app/admin-services/state';

@Component({
  selector: 'admin-employee-rw',
  templateUrl: './employee-rw.component.html',
  styleUrls: ['./employee-rw.component.css']
})
export class EmployeeRwComponent extends BaseRWComponent<EmployeeViewModel> {
  @Input() services: ServiceFullModel[];
  @Input() schedules: ISchedule[];

  writeModel(): EmployeeWriteModel {
    return {...this.model};
  }

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
}
