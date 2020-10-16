import {Component} from '@angular/core';
import {CreateDialogComponent} from '@core/generics/components/CreateDialogComponent';
import {MatDialogRef} from '@angular/material/dialog';
import {Schedule} from '@api/models';

@Component({
  selector: 'app-create-schedule-dialog',
  templateUrl: './create-schedule-dialog.component.html',
  styleUrls: ['./create-schedule-dialog.component.scss']
})
export class CreateScheduleDialogComponent extends CreateDialogComponent {

  model = new Schedule();

  constructor(dialogRef: MatDialogRef<CreateScheduleDialogComponent>) {
    super(dialogRef);
  }
}
