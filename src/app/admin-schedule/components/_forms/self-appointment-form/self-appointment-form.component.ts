import {Component} from '@angular/core';
import {Appointment} from '../../../../core/models/Appointment';
import {BaseFormComponent} from '../BaseFormComponent';
import {FormBuilder, Validators} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'admin-self-appointment-form',
  templateUrl: './self-appointment-form.component.html',
  styleUrls: ['./self-appointment-form.component.scss']
})
export class SelfAppointmentFormComponent extends BaseFormComponent<Appointment> {

  form;

  constructor(private fb: FormBuilder) {
    super();
  }

  submitModel() {
    this.form.patchValue({
      start: this.formDatetime('startDate', 'startTime'),
      end: this.formDatetime('endDate', 'endTime')
    });
    return this.form.value;
  }

  createForm() {
    this.form = this.fb.group({
      id: [this.model.id, Validators.required],
      employee: [this.model.employee.id, Validators.required],
      customer: [this.model.employee.id, Validators.required],
      status: [this.model.status, Validators.required],
      start: [this.model.start.toISOString(), ],
      end: [this.model.end.toISOString(), ],
      startDate: [this.model.start.format('YYYY-MM-DD'), Validators.required],
      startTime: [this.model.start.format('hh:mm'), Validators.required],
      endDate: [this.model.end.format('YYYY-MM-DD'), Validators.required],
      endTime: [this.model.end.format('hh:mm'), Validators.required],
    });
  }

  formDatetime(dateName, timeName) {
    const date = moment.utc(this.form.get(dateName).value);
    const time = moment.duration(this.form.get(timeName).value);
    date.hour(time.hours());
    date.minute(time.minutes());
    return date.toISOString();
  }

}
