import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CreateDialogComponent} from '../../../core/generics/components/CreateDialogComponent';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IShiftWriteModel, TimeFrame} from '../../../core/models/Shift';

@Component({
  selector: 'app-create-shift-dialog',
  templateUrl: './create-shift-dialog.component.html',
  styleUrls: ['./create-shift-dialog.component.css']
})
export class CreateShiftDialogComponent implements CreateDialogComponent {

  form;

  constructor(public dialogRef: MatDialogRef<CreateShiftDialogComponent>,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      frames: this.fb.array([])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.writeModel());
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
