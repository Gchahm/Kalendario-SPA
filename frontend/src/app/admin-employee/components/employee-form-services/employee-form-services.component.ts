import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CheckBoxForm} from '@admin/components/_form/CheckBoxForm';
import {ServiceFullModel} from '@app/admin-services/state';
import {EmployeeViewModel} from '@app/admin-employee/state';

@Component({
  selector: 'admin-employee-form-services',
  templateUrl: './employee-form-services.component.html',
  styleUrls: ['./employee-form-services.component.css']
})
export class EmployeeFormServicesComponent extends CheckBoxForm<ServiceFullModel> implements OnInit {
  @Input() model: EmployeeViewModel;
  @Input() editMode = false;
  @Output() edit = new EventEmitter<boolean>();

  modelField(model: ServiceFullModel): string {
    return model.categoryModel ? model.categoryModel.name : 'undefined';
  }
}
