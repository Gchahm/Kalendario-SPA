import {Component} from '@angular/core';
import {IShiftWriteModel, Shift, TimeFrame} from '../../../../core/models/Shift';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseFormComponent} from '../BaseFormComponent';
import {ShiftService} from '../../../services/shift.service';

@Component({
  selector: 'admin-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.scss']
})
export class ShiftFormComponent extends BaseFormComponent<Shift> {

  constructor(private fb: FormBuilder,
              service: ShiftService) {
    super(service);
  }

  createForm() {
    this.form = this.fb.group({
      id: [this.model.id, ],
      name: [this.model.name, Validators.required],
      frames: this.fb.array(this.model.frames.map(f => this.frameForm(f)))
    });
  }

  frames(): FormArray {
    return this.form.get('frames') as FormArray;
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
