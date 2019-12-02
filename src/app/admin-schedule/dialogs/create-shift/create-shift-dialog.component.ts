import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CreateDialogComponent} from '../../../core/generics/components/CreateDialogComponent';

@Component({
  selector: 'app-create-shift-dialog',
  templateUrl: './create-shift-dialog.component.html',
  styleUrls: ['./create-shift-dialog.component.css']
})
export class CreateShiftDialogComponent implements CreateDialogComponent {


  constructor(public dialogRef: MatDialogRef<CreateShiftDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
