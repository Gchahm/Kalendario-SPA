import {Component, Input} from '@angular/core';
import {IAppointment} from '@api/models';
import {Store} from '@ngrx/store';
import * as fromAppointments from '@app/admin-appointments/state';

@Component({
  selector: 'employee-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.css']
})
export class ScheduleAppointmentComponent {
  @Input() appointment: IAppointment;
  @Input() showEdit: boolean;

  constructor(private store: Store<fromAppointments.State>) {
  }

  customerDetails(): string {
    return this.appointment.customer?.email + '\n' + this.appointment.customer?.phone;
  }

  edit() {
    this.store.dispatch(fromAppointments.actions.openAppointmentEventDialog({
      id: this.appointment.id,
      employeeMode: true
    }));
  }
}
