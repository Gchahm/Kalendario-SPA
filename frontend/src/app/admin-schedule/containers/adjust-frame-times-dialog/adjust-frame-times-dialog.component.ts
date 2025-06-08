import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'admin-adjust-frame-times-dialog',
  templateUrl: './adjust-frame-times-dialog.component.html',
  styleUrls: ['./adjust-frame-times-dialog.component.css']
})
export class AdjustFrameTimesDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AdjustFrameTimesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { start: string, end: string }) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.data);
  }
}
