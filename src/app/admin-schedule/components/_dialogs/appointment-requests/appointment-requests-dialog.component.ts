import {Component, Inject} from '@angular/core';
import {Appointment} from '../../../../core/models/Appointment';
import {AppointmentService} from '../../../../shared/services/appointment.service';
import {ToastService} from '../../../../shared/services/toast.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'employee-appointment-requests',
  templateUrl: './appointment-requests-dialog.component.html',
  styleUrls: ['./appointment-requests-dialog.component.css']
})
export class AppointmentRequestsDialogComponent {

  appointments: Appointment[];

  constructor(private appointmentsService: AppointmentService,
              private toast: ToastService,
              public dialogRef: MatDialogRef<AppointmentRequestsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { requests: Appointment[] }) {
    this.appointments = data.requests;
  }

  accept(appointment) {
    this.updateStatus(appointment, 'A');
  }

  reject(appointment) {
    this.updateStatus(appointment, 'R');
  }

  private updateStatus(appointment, status) {
    appointment.status = status;
    this.appointmentsService.patch(appointment.id, appointment.writeModel())
      .toPromise()
      .then(apt => {
        this.toast.success('appointment updated');
        this.appointments.splice(this.appointments.findIndex(a => a.id === apt.id), 1);
      })
      .catch(err => this.toast.error(err));
  }
}
