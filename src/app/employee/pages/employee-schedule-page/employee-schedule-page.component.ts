import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Appointment, Employee} from '@api/models';
import {Store} from '@ngrx/store';
import {AdminAppointmentParams} from '@api/clients/AppointmentAdminClient.service';
import {map, switchMap} from 'rxjs/operators';

import * as fromAppointments from '@app/admin-appointments/state';
import * as fromCore from '@app/core/state';
import {ModelPermissions} from '@app/core/state';


@Component({
  selector: 'employee-schedule-page',
  templateUrl: './employee-schedule-page.component.html',
  styleUrls: ['./employee-schedule-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeSchedulePageComponent implements OnInit {

  currentDate$: Observable<Moment>;
  appointments$: Observable<Appointment[]>;
  permissions$: Observable<ModelPermissions>;
  employee$: Observable<Employee>;
  startDate: Moment;
  endDate: Moment;


  constructor(private store: Store<fromAppointments.State>) {
  }

  ngOnInit(): void {
    this.initialize();
    this.employee$ = this.store.select(fromCore.selectCurrentUserEmployee);
    this.appointments$ = this.employee$.pipe(
      switchMap(e => this.store.select(fromAppointments.selectors.selectCurrentDateEmployeeAppointments, {employeeId: e.id }))
    );
    this.permissions$ = this.store.select(fromCore.hasPermission, {model: Appointment.modelType});
    this.currentDate$ = this.store.select(fromAppointments.selectors.selectCurrentDate)
      .pipe(map(d => moment.utc(d)));
  }

  initialize() {
    this.updateCurrent(moment().utc().startOf('day'));
    this.startDate = moment().utc().startOf('day').subtract(3, 'day');
    this.endDate = moment().utc().startOf('day').add(3, 'day');
    this.loadAppointments();
  }

  updateCurrent(date: Moment) {
    this.store.dispatch(fromAppointments.actions.setCurrentDate({date}));

    if (date.isAfter(this.endDate)) {
      this.startDate = date;
      this.endDate = moment.utc(date.toISOString()).add(6, 'day');
    }
    if (date.isBefore(this.startDate)) {
      this.startDate = moment.utc(date.toISOString()).subtract(6, 'day');
      this.endDate = date;
    }
    this.loadAppointments();
  }

  loadAppointments() {
    const params: AdminAppointmentParams = {
      fromDate: this.startDate,
      toDate: this.endDate
    };
    this.store.dispatch(fromAppointments.actions.requestEntities({params}));
  }

  openCreateDialog(date: Moment, employee: Employee) {
    this.store.dispatch(fromAppointments.actions.openCreateAppointmentDialog({date, employee}));
  }
}
