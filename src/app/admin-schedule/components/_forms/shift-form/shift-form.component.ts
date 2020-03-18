import {Component, OnInit} from '@angular/core';
import {Shift, TimeFrame} from '../../../../core/models/Shift';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseFormComponent} from '../BaseFormComponent';

@Component({
  selector: 'admin-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.css']
})
export class ShiftFormComponent extends BaseFormComponent<Shift> implements OnInit {

  form;

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
      frames: this.fb.array(this.model.frames.map(f => this.frameForm(f)))
    });
  }

  frames(): FormArray {
    return this.form.get('frames');
  }

  addFrame() {
    this.frames().push(this.frameForm(new TimeFrame('00:00', '00:00')));
  }

  removeFrame(frame) {
    this.frames().removeAt(this.frames().controls.indexOf(frame));
  }

  private frameForm(f: TimeFrame): FormGroup {
    return this.fb.group({
      start: [f.start.toString()],
      end: [f.end.toString()]
    });
  }
}
