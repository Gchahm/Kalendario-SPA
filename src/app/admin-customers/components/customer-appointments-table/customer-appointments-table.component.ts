import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAppointment} from '@api/models';
import {ICustomer, IEmployee, Service} from '@api/models';
import {Moment} from 'moment';
import * as moment from 'moment';
import {AppointmentQueryParams} from '@api/queryParams';

@Component({
  selector: 'app-customer-appointments-table',
  templateUrl: './customer-appointments-table.component.html',
  styleUrls: ['./customer-appointments-table.component.css']
})
export class CustomerAppointmentsTableComponent implements OnInit {

  @Input() services: Service[];
  @Input() employees: IEmployee[];

  private _customer: ICustomer;
  @Input() set customer(value: ICustomer) {
    this._customer = value;
    if (this.init) {
      this.emitFilterChange();
    }
  }

  get customer(): ICustomer {
    return this._customer;
  }

  @Input() set appointments(appointments: IAppointment[]) {
    this.appointmentData = appointments.map(appointment => {
      return {
        id: appointment.id,
        start: appointment.start.format('DD/MM/YYYY'),
        employee: appointment.employee.name,
        service: appointment.service.name,
        deleted: appointment.deleted
      };
    });
  }

  @Output() select = new EventEmitter<number>();
  @Output() filterChange = new EventEmitter<AppointmentQueryParams>();

  appointmentData: AppointmentData[];
  displayedColumns: string[] = ['start', 'employee', 'service', 'deleted'];
  init = false;

  private _selectedServices: number[];
  get selectedServices() {
    return this._selectedServices || [];
  }

  set selectedServices(value: number[]) {
    this._selectedServices = value;
    this.emitFilterChange();
  }

  private _selectedEmployees: number[];
  get selectedEmployees() {
    return this._selectedEmployees || [];
  }

  set selectedEmployees(value: number[]) {
    this._selectedEmployees = value;
    this.emitFilterChange();
  }

  private _fromDate: Moment;
  get fromDate(): Moment {
    return this._fromDate || moment.utc();
  }

  set fromDate(value: Moment) {
    this._fromDate = value;
    this.emitFilterChange();
  }

  adate = moment();
  private _toDate: Moment;
  get toDate(): Moment {
    return this._toDate || moment.utc().add(3, 'd');
  }

  set toDate(value: Moment) {
    this._toDate = value;
    this.emitFilterChange();
  }

  private _showAll: boolean;
  get showAll(): boolean {
    return this._showAll || false;
  }

  set showAll(value: boolean) {
    this._showAll = value;
    this.emitFilterChange();
  }

  ngOnInit() {
    this.emitFilterChange();
    this.init = true;
  }

  onLineClick(row: AppointmentData) {
    this.select.emit(row.id);
  }

  private emitFilterChange() {
    this.filterChange.emit({
      employees: this.selectedEmployees,
      services: this.selectedServices,
      from_date: this.fromDate,
      to_date: this.toDate,
      customer: this.customer.id,
      show_all: this.showAll
    });
  }
}

interface AppointmentData {
  id: number;
  start: string;
  employee: string;
  service: string;
  deleted: Moment;
}
