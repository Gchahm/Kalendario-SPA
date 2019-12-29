import {Component, Inject} from '@angular/core';
import {Appointment, IAppointmentWriteModel} from '../../../core/models/Appointment';
import {SelfAppointment} from '../../models/SelfAppointment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DetailsComponent} from '../../../core/generics/components/DetailsComponent';
import {IBaseAppointmentRead} from '../../../core/models/IBaseAppointmentRead';
import * as moment from 'moment';

@Component({
  selector: 'employee-appointment-event',
  templateUrl: './appointment-event-dialog.component.html',
  styleUrls: ['./appointment-event-dialog.component.css']
})
export class AppointmentEventDialogComponent extends DetailsComponent<IBaseAppointmentRead> {

  appointment: Appointment;
  selfAppointment: SelfAppointment;

  start = {date: '', time: ''};

  constructor(public dialogRef: MatDialogRef<AppointmentEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { appointment: IBaseAppointmentRead }) {
    super();
    this.model = data.appointment;
    this.start.date = data.appointment.start.toISOString();
    this.start.time = data.appointment.start.format('HH:mm');

    if (data.appointment instanceof Appointment) {
      this.appointment = data.appointment;
    }
    if (data.appointment instanceof SelfAppointment) {
      this.selfAppointment = data.appointment;
    }
  }

  save() {
    const model = this.onUpdateEvent.model as IAppointmentWriteModel;
    const start = moment.utc(this.start.date).startOf('day');
    start.set('hour', +this.start.time.substr(0, 2));
    start.set('minute', +this.start.time.substr(3));
    model.start = start.toISOString();
    super.save();
  }

  delete() {
    super.delete();
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
