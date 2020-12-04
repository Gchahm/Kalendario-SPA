import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import {Observable} from 'rxjs';
import {IAppointment, IEmployee, Service} from '@api/models';
import {ApiError} from '@api/Errors';
import * as fromAppointments from '@app/admin-appointments/state';
import {AppointmentPermissions} from '@api/permissions';
import * as fromEmployees from '@app/admin-employee/state';
import * as fromServices from '@app/admin-services/state';
import * as fromCore from '@app/core/state';
import {OnInit} from '@angular/core';
import {map} from 'rxjs/operators';


export class BaseAppointmentDialog implements OnInit {

  appointment$: Observable<IAppointment>;
  services$: Observable<Service[]>;
  employees$: Observable<IEmployee[]>;
  apiError$: Observable<ApiError>;
  type$: Observable<string>;
  appointmentType = fromAppointments.AppointmentType;
  permissions$: Observable<AppointmentPermissions>;

  constructor(protected store: Store<State>,
              public employeeMode: boolean = false) {
  }

  ngOnInit() {
    if (this.employeeMode) {
      this.services$ = this.store.select(fromCore.selectCurrentUserEmployeeServices);
      this.employees$ = this.store.select(fromCore.selectCurrentUserEmployee).pipe(map(e => [e]));
    } else {
      this.store.dispatch(fromEmployees.actions.initializeStore({params: {}}));
      this.store.dispatch(fromServices.actions.initializeStore({params: {}}));
      this.services$ = this.store.select(fromServices.selectors.selectAll);
      this.employees$ = this.store.select(fromEmployees.selectors.selectAll);
    }

    this.type$ = this.store.select(fromAppointments.selectors.getInitializedAppointmentType);
    this.apiError$ = this.store.select(fromAppointments.selectors.getApiError);
    this.permissions$ = this.store.select(fromAppointments.selectors.selectAppointmentPermissions);
  }
}
