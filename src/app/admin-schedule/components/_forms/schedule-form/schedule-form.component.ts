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
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent extends BaseFormComponent<Schedule> implements OnInit {

  form;
  @select((s: IAppState) => s.admin.shifts) shifts$;
  @select((s: IAppState) => s.core.isTabletView) isTablet$;

  constructor(private fb: FormBuilder) {
    super();
  }

  submitModel() {
    return this.form.value;
  }

  createForm() {
    const writeModel = this.model.writeModel();
    this.form = this.fb.group({
      id: [writeModel.id, Validators.required],
      name: [writeModel.name, Validators.required],
      mon: [writeModel.mon],
      tue: [writeModel.tue],
      wed: [writeModel.wed],
      thu: [writeModel.thu],
      fri: [writeModel.fri],
      sat: [writeModel.sat],
      sun: [writeModel.sun]
    });
  }

}
