import {Component, OnInit} from '@angular/core';
import {Service} from '@api/models/Service';
import {Employee} from '@api/models/Employee';
import {IAppointment} from '@api/models';
import {select, Store} from '@ngrx/store';
import {State} from '@admin/state/admin.reducer';
import {Customer} from '@api/models/Customer';
import {Observable} from 'rxjs';

import * as fromAppointments from '@app/admin-appointments/state';
import * as fromCustomers from '@app/admin-customers/state';
import * as fromEmployees from '@app/admin-employee/state';
import * as fromServices from '@app/admin-services/state';
import {filter} from 'rxjs/operators';
import {AppointmentQueryParams} from '@api/queryParams';


@Component({
  selector: 'admin-customer-appointments-shell',
  templateUrl: './customer-appointments-shell.component.html',
  styleUrls: ['./customer-appointments-shell.component.css']
})
export class CustomerAppointmentsShellComponent implements OnInit {

  appointments$: Observable<IAppointment[]>;
  selectedCustomer$: Observable<Customer>;
  services$: Observable<Service[]>;
  employees$: Observable<Employee[]>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(fromServices.actions.initializeStore({params: {}}));
    this.store.dispatch(fromEmployees.actions.initializeStore({params: {}}));

    this.services$ = this.store.select(fromServices.selectors.selectAll);
    this.employees$ = this.store.select(fromEmployees.selectors.selectAll);
    this.appointments$ = this.store.select(fromCustomers.selectors.getCurrentCustomerAppointments);

    this.selectedCustomer$ = this.store.pipe(
      select(fromCustomers.selectors.getCurrent),
      filter(customer => customer !== null)
    );

  }

  loadAppointments(params: AppointmentQueryParams) {
    this.store.dispatch(fromAppointments.actions.requestEntities({params}));
  }

  openAppointment(id: number) {
    this.store.dispatch(fromAppointments.actions.openAppointmentEventDialog({id, employeeMode: false}));
  }
}




