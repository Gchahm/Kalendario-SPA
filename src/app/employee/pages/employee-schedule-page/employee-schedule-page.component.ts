import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {Moment} from 'moment';
import {IAppointment, IEmployee, Appointment} from '@api/models';
import {Store} from '@ngrx/store';
import {AdminAppointmentParams} from '@api/clients/AppointmentAdminClient.service';
import {map, switchMap} from 'rxjs/operators';


import {ModelPermissions} from '@api/permissions';
import {IEmployeeResourceModel} from '@api/models/IEmployeeResourceModel';

import * as fromAppointments from '@app/admin-appointments/state';
import * as fromCore from '@app/core/state';
import {BaseContainer} from '@app/containers/BaseContainer';
import {State} from '@app/state';

@Component({
  selector: 'employee-schedule-page',
  templateUrl: './employee-schedule-page.component.html',
  styleUrls: ['./employee-schedule-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeSchedulePageComponent extends BaseContainer implements OnInit {

  currentDate$: Observable<Moment>;
  appointments$: Observable<IAppointment[]>;
  permissions$: Observable<ModelPermissions>;
  employee$: Observable<IEmployeeResourceModel>;
  isLoading$: Observable<boolean>;


  constructor(store: Store<State>) {
    super(store);
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
    this.isLoading$ = this.store.select(fromAppointments.selectors.getIsLoadingEntities);
  }

  initialize() {
    const current = moment().utc().startOf('day');
    this.updateCurrent(current);
    this.loadAppointments(current);
  }

  updateCurrent(date: Moment) {
    this.store.dispatch(fromAppointments.actions.setCurrentDate({date}));
    this.loadAppointments(date);
  }

  loadAppointments(date: Moment) {
    const params: AdminAppointmentParams = {
      fromDate: moment.utc(date).startOf('day'),
      toDate: moment.utc(date).endOf('day'),
    };
    this.store.dispatch(fromAppointments.actions.requestEntities({params}));
  }

  openCreateDialog(date: Moment, employee: IEmployee) {
    this.store.dispatch(fromAppointments.actions.openCreateAppointmentDialog({date, employee, employeeMode: true}));
  }
}
