import { Component} from '@angular/core';
import {CreateDialogComponent} from '../../../../core/generics/components/CreateDialogComponent';
import {Schedule} from '../../../../core/models/Schedule';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-schedule-dialog',
  templateUrl: './create-schedule-dialog.component.html',
  styleUrls: ['./create-schedule-dialog.component.css']
})
export class CreateScheduleDialogComponent extends CreateDialogComponent {

  model = new Schedule();

  constructor(dialogRef: MatDialogRef<CreateScheduleDialogComponent>) {
    super(dialogRef);
  }
}
