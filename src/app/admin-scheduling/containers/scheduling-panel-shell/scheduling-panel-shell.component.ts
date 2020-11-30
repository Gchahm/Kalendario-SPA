import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Moment} from 'moment';
import {Observable} from 'rxjs';

import {Slot} from '@app/admin-scheduling/models/Slot';
import {Appointment, Employee, Schedule} from '@api/models';

import {CalendarEvent} from '@app/admin-scheduling/models/CalendarEvent';

import {Store} from '@ngrx/store';
import {State} from '@admin/state/admin.reducer';
import * as fromScheduling from '@app/admin-scheduling/state';
import * as fromAppointments from '@app/admin-appointments/state';
import {TimeOfDay} from '@api/models/TimeOfDay';

@Component({
  selector: 'admin-scheduling-panel-shell',
  templateUrl: './scheduling-panel-shell.component.html',
  styleUrls: ['./scheduling-panel-shell.component.scss']
})
export class SchedulingPanelShellComponent implements OnInit {

  @Input() employee: Employee;
  @Input() schedule: Schedule;
  @Input() date: Moment;
  @Input() showCalendarHours: boolean;

  @Output() close = new EventEmitter<Employee>();

  events$: Observable<CalendarEvent[]>;
  requests$: Observable<Appointment[]>;
  availability$: Observable<Slot[]>;

  constructor(protected store: Store<State>) {
  }

  ngOnInit() {
    this.events$ = this.store.select(fromScheduling.selectors.getEmployeeEvents, this.employee.id);
    this.availability$ = this.store.select(fromScheduling.selectors.getAvailability, {scheduleId: this.employee.schedule});
  }

  closeClick() {
    this.close.emit(this.employee);
  }

  createSelfAppointment() {
    this.store.dispatch(fromAppointments.actions.openCreateSelfAppointmentDialog({
      date: this.date,
      employee: this.employee
    }));
  }

  createAppointment() {
    this.store.dispatch(fromAppointments.actions.openCreateAppointmentDialog({
      date: this.date,
      employee: this.employee,
      employeeMode: false
    }));
  }

  createAppointment2(time: TimeOfDay) {
    const date = this.date.clone();
    date.minute(time.minute);
    date.hour(time.hour);
    this.store.dispatch(fromAppointments.actions.openCreateAppointmentDialog({
      date,
      employee: this.employee,
      employeeMode: false
    }));
  }

  editAppointment(id: number) {
    this.store.dispatch(fromAppointments.actions.openAppointmentEventDialog({id, employeeMode: false}));
  }
}

