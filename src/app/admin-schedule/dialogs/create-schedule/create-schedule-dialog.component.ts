import { Component, OnInit } from '@angular/core';
import {CreateDialogComponent} from '../../../core/generics/components/CreateDialogComponent';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-schedule-dialog',
  templateUrl: './create-schedule-dialog.component.html',
  styleUrls: ['./create-schedule-dialog.component.css']
})
export class CreateScheduleDialogComponent implements CreateDialogComponent {

  constructor(public dialogRef: MatDialogRef<CreateScheduleDialogComponent>) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
