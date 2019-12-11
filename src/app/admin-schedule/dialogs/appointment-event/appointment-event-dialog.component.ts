import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Appointment} from '../../../core/models/Appointment';
import {Moment} from 'moment';
import {SelfAppointment} from '../../models/SelfAppointment';
import {AppointmentService} from '../../../shared/services/appointment.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'employee-appointment-event',
  templateUrl: './appointment-event-dialog.component.html',
  styleUrls: ['./appointment-event-dialog.component.css']
})
export class AppointmentEventDialogComponent implements OnInit {

  @Input() showDate = false;
  @Input() showButtons = false;

  @Output() eventClicked = new EventEmitter<Moment>();

  appointment: Appointment;
  selfAppointment: SelfAppointment;

  constructor(private appointmentsService: AppointmentService,
              public dialogRef: MatDialogRef<AppointmentEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { id: string }) {
  }

  ngOnInit() {
    this.appointmentsService.getAppointment(this.data.id)
      .toPromise()
      .then(baseAppointment => {
        if (baseAppointment instanceof Appointment) {
          this.appointment = baseAppointment;
        }
        if (baseAppointment instanceof SelfAppointment) {
          this.selfAppointment = baseAppointment;
        }
      });
  }
}
