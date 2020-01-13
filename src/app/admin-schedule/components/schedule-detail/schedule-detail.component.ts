import {Component, OnInit} from '@angular/core';
import {DetailsComponent} from '../../../core/generics/components/DetailsComponent';
import {IScheduleReadModel, IScheduleWriteModel} from '../../../core/models/Schedule';
import {FormBuilder, Validators} from '@angular/forms';
import {ShiftService} from '../../services/shift.service';
import {Shift} from '../../../core/models/Shift';

@Component({
  selector: 'schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent extends DetailsComponent<IScheduleReadModel> implements OnInit {

  public shifts$;
  form;

  constructor(private fb: FormBuilder,
              private shiftService: ShiftService) {
    super();
  }

  ngOnInit() {
    this.shifts$ = this.shiftService.get();
  }

  edit() {
    this.createForm();
    super.edit();
  }

  createForm() {
    this.form = this.fb.group({
      id: [this.model.id, Validators.required],
      name: [this.model.name, Validators.required],
      mon: [this.model.shiftId(this.model.mon)],
      tue: [this.model.shiftId(this.model.tue)],
      wed: [this.model.shiftId(this.model.wed)],
      thu: [this.model.shiftId(this.model.thu)],
      fri: [this.model.shiftId(this.model.fri)],
      sat: [this.model.shiftId(this.model.sat)],
      sun: [this.model.shiftId(this.model.sun)]
    });
  }

  updateControl(control, value) {
    this.form.controls[control].setValue(value);
  }

  writeModel(): IScheduleWriteModel {
    return this.form.value as IScheduleWriteModel;
  }

  onSubmit() {
    this.onUpdateEvent.model = this.writeModel();
    this.save();
  }

}
