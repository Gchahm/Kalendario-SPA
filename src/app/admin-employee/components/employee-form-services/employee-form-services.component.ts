import {Component, OnInit} from '@angular/core';
import {CheckBoxForm} from '@admin/components/_form/CheckBoxForm';
import {ServiceFullModel} from '@app/admin-services/state';

@Component({
  selector: 'admin-employee-form-services',
  templateUrl: './employee-form-services.component.html',
  styleUrls: ['./employee-form-services.component.css']
})
export class EmployeeFormServicesComponent extends CheckBoxForm<ServiceFullModel> implements OnInit {
  modelField(model: ServiceFullModel): string {
    return model.categoryModel ? model.categoryModel.name : 'undefined';
  }
}
