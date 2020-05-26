import {Component} from '@angular/core';
import {Moment} from 'moment';
import * as moment from 'moment';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '@app/Store';
import {ADD_EMPLOYEE, REMOVE_EMPLOYEE} from '../../SchedulingActions';
import {Employee} from '@core/models/Employee';

@Component({
  selector: 'admin-appointment-dashboard',
  templateUrl: './appointment-dashboard.component.html',
  styleUrls: ['./appointment-dashboard.component.scss'],
})

export class AppointmentDashboardComponent {

  @select((s: IAppState) => s.admin.employees) employees$;
  @select((s: IAppState) => s.scheduling.employees) selectedEmployees$;
  @select((s: IAppState) => s.core.isMobileView) isMobile$;

  date: Moment = moment.utc();

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
    this.date = moment.utc();
  }

  previousDay() {
    this.date = this.date.subtract(1, 'd').clone();
  }

  nextDay() {
    this.date = this.date.add(1, 'd').clone();
  }


  isSelected(emp: Employee): boolean {
    return this.redux.getState().scheduling.employees.findIndex(e => e.id === emp.id) !== -1;
  }
}
