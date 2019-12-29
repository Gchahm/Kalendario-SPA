import {Component} from '@angular/core';
import {DetailsComponent} from '../../../core/generics/components/DetailsComponent';
import {IShiftReadModel, IShiftWriteModel, TimeFrame} from '../../../core/models/Shift';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'shift-detail',
  templateUrl: './shift-detail.component.html',
  styleUrls: ['./shift-detail.component.css']
})
export class ShiftDetailComponent extends DetailsComponent<IShiftReadModel> {

  form;

  constructor(private fb: FormBuilder) {
    super();
  }

  edit() {
    this.createForm();
    super.edit();
  }

  onSubmit() {
    this.onUpdateEvent.model = this.writeModel();
    this.save();
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

  writeModel(): IShiftWriteModel {
    return this.form.value as IShiftWriteModel;
  }

  private frameForm(f: TimeFrame): FormGroup {
    return this.fb.group({
      start: [f.start.toString()],
      end: [f.end.toString()]
    });
  }
}
