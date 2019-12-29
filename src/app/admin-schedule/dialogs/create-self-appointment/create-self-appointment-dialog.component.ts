import {Component, Inject} from '@angular/core';
import {Employee} from '../../../core/models/Employee';
import {Moment} from 'moment';
import {ToastService} from '../../../shared/services/toast.service';
import * as moment from 'moment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SelfAppointmentService} from '../../../shared/services/self-appointment.service';
import {ISelfAppointmentWriteModel, SelfAppointment} from '../../models/SelfAppointment';
import {CreateDialogComponent} from '../../../core/generics/components/CreateDialogComponent';

@Component({
  selector: 'employee-form-self-appointment',
  templateUrl: './create-self-appointment-dialog.component.html',
  styleUrls: ['./create-self-appointment-dialog.component.css']
})
export class CreateSelfAppointmentDialogComponent implements CreateDialogComponent {

  minDate = new Date();
  form: CreateSelfAppointmentForm;
  model: ISelfAppointmentWriteModel;

  constructor(public dialogRef: MatDialogRef<CreateSelfAppointmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { employee: Employee, date: Moment }) {
    this.form = new CreateSelfAppointmentForm();
    this.form.startDate = data.date.format('YYYY-MM-DD');
    this.form.endDate = data.date.format('YYYY-MM-DD');
    this.model = SelfAppointment.CreateModel();
    this.model.employee = data.employee.id.toString();
  }

  submit() {
    this.model.start = moment.utc(this.form.startDate + ' ' + this.form.startTime).toISOString();
    this.model.end = moment.utc(this.form.endDate + ' ' + this.form.endTime).toISOString();
    this.dialogRef.close(this.model);
  }

  onNoClick() {
  }
}

class CreateSelfAppointmentForm {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}
