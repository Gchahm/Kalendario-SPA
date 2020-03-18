import {Component} from '@angular/core';
import {Moment} from 'moment';
import * as moment from 'moment';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../../Store';
import {ADD_EMPLOYEE, REMOVE_EMPLOYEE} from '../../SchedulingActions';
import {FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material';
import {Employee} from '../../../core/models/Employee';

@Component({
  selector: 'admin-appointment-dashboard',
  templateUrl: './appointment-dashboard.component.html',
  styleUrls: ['./appointment-dashboard.component.css'],
})

export class AppointmentDashboardComponent {

  @select((s: IAppState) => s.admin.employees) employees$;
  @select((s: IAppState) => s.scheduling.employees) selectedEmployees$;

  date: Moment = moment.utc();
  fc = new FormControl(moment.utc());

  constructor(private redux: NgRedux<IAppState>) {
  }


  addPanel(employee: Employee) {
    if (!this.isSelected(employee)) {
      this.redux.dispatch({type: ADD_EMPLOYEE, employee});
    }
  }

  removePanel(employee) {
    this.redux.dispatch({type: REMOVE_EMPLOYEE, employee});
  }

  today() {
    this.fc.patchValue(moment.utc());
    this.date = this.fc.value;
  }

  previousDay() {
    this.fc.patchValue(this.fc.value.subtract(1, 'days').clone());
    this.date = this.fc.value;
  }

  nextDay() {
    this.fc.patchValue(this.fc.value.add(1, 'days').clone());
    this.date = this.fc.value;
  }

  changeDate(event: MatDatepickerInputEvent<Moment>) {
    this.date = event.value;
  }

  isSelected(emp: Employee): boolean {
    return this.redux.getState().scheduling.employees.findIndex(e => e.id === emp.id) !== -1;
  }
}
