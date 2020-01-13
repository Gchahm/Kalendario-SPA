import { Component, OnInit } from '@angular/core';
import {CreateDialogComponent} from '../../../core/generics/components/CreateDialogComponent';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, Validators} from '@angular/forms';
import {ShiftService} from '../../services/shift.service';
import {IScheduleWriteModel} from '../../../core/models/Schedule';
import {Shift} from '../../../core/models/Shift';

@Component({
  selector: 'app-create-schedule-dialog',
  templateUrl: './create-schedule-dialog.component.html',
  styleUrls: ['./create-schedule-dialog.component.css']
})
export class CreateScheduleDialogComponent implements CreateDialogComponent, OnInit {

  public shifts$;
  form;

  constructor(public dialogRef: MatDialogRef<CreateScheduleDialogComponent>,
              private fb: FormBuilder,
              private shiftService: ShiftService) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.shifts$ = this.shiftService.get();
    this.form = this.fb.group({
      name: ['' , Validators.required],
      mon: [''],
      tue: [''],
      wed: [''],
      thu: [''],
      fri: [''],
      sat: [''],
      sun: ['']
    });
  }

  onSubmit() {
    this.dialogRef.close(this.writeModel());
  }

  updateControl(control, value) {
    this.form.controls[control].setValue(value);
  }

  writeModel(): IScheduleWriteModel {
    return this.form.value as IScheduleWriteModel;
  }
}
