import {Component} from '@angular/core';
import {Service} from '../../../../core/models/Service';
import {select} from '@angular-redux/store';
import {IAppState} from '../../../../Store';
import {Observable} from 'rxjs';
import {BaseFormComponent} from '../BaseFormComponent';
import {Schedule} from '../../../../core/models/Schedule';
import {Employee} from '../../../../core/models/Employee';

@Component({
  selector: 'admin-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent extends BaseFormComponent<Employee> {

  @select((s: IAppState) => s.admin.services) services$: Observable<Service[]>;
  @select((s: IAppState) => s.admin.schedules) schedules$: Observable<Schedule[]>;

  constructor() {
    super();
  }

  submitModel() {
    return this.onUpdateEvent.model;
  }

  createForm() {
  }
}


