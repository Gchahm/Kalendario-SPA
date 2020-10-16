import {Component, EventEmitter, Output} from '@angular/core';
import {BaseDetailsComponent} from '@shared/common/BaseDetailsComponent';
import {EmployeeModel} from '@app/admin-employee/state';
import {ImageSnippet} from '@shared/components/image-input/image-input.component';

@Component({
  selector: 'admin-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent extends BaseDetailsComponent<EmployeeModel> {

  @Output() photoChange = new EventEmitter<ImageSnippet>();

  services() {
    return this.model.services.map(s => ({name: s.name, value: s.duration}));
  }

  details(): { name: string, value: string }[] {
    return [
      {name: 'name', value: this.model.employee.name},
      {name: 'private', value: this.model.employee.private ? 'yes' : 'no'},
      {name: 'email', value: this.model.employee.email},
      {name: 'phone', value: this.model.employee.phone},
      {name: 'instagram', value: this.model.employee.instagram}
    ];
  }
}

