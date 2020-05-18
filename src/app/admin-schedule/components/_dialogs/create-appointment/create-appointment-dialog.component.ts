import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Appointment} from '../../../../core/models/Appointment';
import {CreateDialogComponent} from '../../../../core/generics/components/CreateDialogComponent';
import {Employee} from '../../../../core/models/Employee';
import {Moment} from 'moment';

@Component({
  selector: 'employee-form-appointment',
  templateUrl: './create-appointment-dialog.component.html',
  styleUrls: ['./create-appointment-dialog.component.scss'],
})
export class CreateAppointmentDialogComponent extends CreateDialogComponent {

  model: Appointment;
  type: string;

  constructor(dialogRef: MatDialogRef<CreateAppointmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { employee: Employee, date: Moment, type: string }) {
    super(dialogRef);
    const appointment = new Appointment();
    appointment.employee = data.employee;
    appointment.start = data.date.clone();
    appointment.end = data.date.clone();
    appointment.status = 'A';

    this.model = appointment;
    this.type = data.type;
  }
}
