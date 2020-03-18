import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Schedule} from '../../../../core/models/Schedule';
import {BaseFormComponent} from '../BaseFormComponent';
import {IAppState} from '../../../../Store';
import {select} from '@angular-redux/store';
import {modelId} from '../../../../core/models/interfaces/IReadModel';

@Component({
  selector: 'admin-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent extends BaseFormComponent<Schedule> implements OnInit {

  form;
  @select((s: IAppState) => s.admin.shifts) shifts$;

  constructor(private fb: FormBuilder) {
    super();
  }

  submitModel() {
    return this.form.value;
  }

  createForm() {
    this.form = this.fb.group({
      id: [this.model.id, Validators.required],
      name: [this.model.name, Validators.required],
      mon: [modelId(this.model.mon)],
      tue: [modelId(this.model.tue)],
      wed: [modelId(this.model.wed)],
      thu: [modelId(this.model.thu)],
      fri: [modelId(this.model.fri)],
      sat: [modelId(this.model.sat)],
      sun: [modelId(this.model.sun)]
    });
  }

  updateControl(control, value) {
    this.form.controls[control].setValue(value);
  }
}
