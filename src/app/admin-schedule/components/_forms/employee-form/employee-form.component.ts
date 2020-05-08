import {Component} from '@angular/core';
import {Service} from '../../../../core/models/Service';
import {select} from '@angular-redux/store';
import {IAppState} from '../../../../Store';
import {Observable} from 'rxjs';
import {BaseFormComponent} from '../BaseFormComponent';
import {Schedule} from '../../../../core/models/Schedule';
import {Employee} from '../../../../core/models/Employee';
import {FormBuilder} from '@angular/forms';
import {AdminEmployeeService} from '../../../services/admin-employee.service';

@Component({
  selector: 'admin-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent extends BaseFormComponent<Employee> {

  @select((s: IAppState) => s.admin.services) services$: Observable<Service[]>;
  @select((s: IAppState) => s.admin.schedules) schedules$: Observable<Schedule[]>;

  constructor(service: AdminEmployeeService) {
    super(service);
  }
}


