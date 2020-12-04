import {Component, Input, OnInit} from '@angular/core';
import {BaseFormComponent} from '@shared/common/BaseFormComponent';
import {IScheduleWriteModel, ISchedule, TimeFrame} from '@api/models';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'admin-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent extends BaseFormComponent<ISchedule> implements OnInit {
  @Input() isTablet: boolean;

  constructor(public fb: FormBuilder) {
    super();
  }

  writeModel(): IScheduleWriteModel {
    return {
      id: this.model.id,
      name: this.model.name,
      mon: this.model.mon,
      tue: this.model.tue,
      wed: this.model.wed,
      thu: this.model.thu,
      fri: this.model.fri,
      sat: this.model.sat,
      sun: this.model.sun
    };
  }

  createForm() {
    this.form = this.fb.group({
      id: [this.model.id],
      name: [this.model.name, Validators.required],
    });
    for (const value of this.model.shifts) {
      this.form.addControl(value, this.shiftForm(value));
    }
  }

  frames(item: string): FormArray {
    return this.form.get(item).get('frames') as FormArray;
  }

  addFrame(item: string) {
    this.frames(item).push(this.frameForm(new TimeFrame('00:00', '00:00')));
  }

  removeFrame(item: string, frame) {
    this.frames(item).removeAt(this.frames(item).controls.indexOf(frame));
  }

  private shiftForm(value) {
    if (!this.model[value]) {
      return this.fb.group({
        frames: this.fb.array([])
      });
    }
    return this.fb.group({
      frames: this.fb.array(this.model[value].frames.map(f => this.frameForm(f)))
    });
  }

  private frameForm(f: TimeFrame): FormGroup {
    return new FormGroup({
      start: new FormControl(f.start.toString()),
      end: new FormControl(f.end.toString())
    });
  }
}
