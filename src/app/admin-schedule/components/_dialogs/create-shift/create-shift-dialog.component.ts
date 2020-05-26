import {Component} from '@angular/core';
import {CreateDialogComponent} from '@core/generics/components/CreateDialogComponent';
import {Shift} from '@core/models/Shift';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-shift-dialog',
  templateUrl: './create-shift-dialog.component.html',
  styleUrls: ['./create-shift-dialog.component.scss']
})
export class CreateShiftDialogComponent extends CreateDialogComponent {

  model = new Shift();

  constructor(dialogRef: MatDialogRef<CreateShiftDialogComponent>) {
    super(dialogRef);
  }
}
