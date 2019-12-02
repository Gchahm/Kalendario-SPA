import {Component, Input} from '@angular/core';
import {Service} from '../../../core/models/Service';
import {Globals} from '../../../core/services/Globals';
import {DetailsComponent} from '../../../core/generics/components/DetailsComponent';
import {EmployeeReadModel, EmployeeWriteModel} from '../../../core/models/Employee';

@Component({
  selector: 'employee-profile',
  templateUrl: './employee-panel.component.html',
  styleUrls: ['./employee-panel.component.css']
})
export class EmployeePanelComponent extends DetailsComponent<EmployeeReadModel> {

  constructor(public globals: Globals) {
    super();
  }

  @Input() services: Service[];

}
