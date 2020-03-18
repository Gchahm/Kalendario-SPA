import {Component, Inject} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../../shared/helpers/format-datepicker';
import {Appointment} from '../../../../core/models/Appointment';
import {CreateDialogComponent} from '../../../../core/generics/components/CreateDialogComponent';
import {Employee} from '../../../../core/models/Employee';
import {Moment} from 'moment';

@Component({
  selector: 'employee-form-appointment',
  templateUrl: './create-appointment-dialog.component.html',
  styleUrls: ['./create-appointment-dialog.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class CreateAppointmentDialogComponent extends CreateDialogComponent {

  model = new Appointment();
  type: string;

  constructor(dialogRef: MatDialogRef<CreateAppointmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { employee: Employee, date: Moment, type: string }) {
    super(dialogRef);
    this.model.employee = data.employee;
    this.model.start = data.date;
    this.model.end = data.date;
    this.model.status = 'A';
    this.type = data.type;
  }
}
