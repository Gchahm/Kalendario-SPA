import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-slots-for-service-dialog',
  templateUrl: './slots-for-service-dialog.component.html',
  styleUrls: ['./slots-for-service-dialog.component.css']
})
export class SlotsForServiceDialogComponent {
  constructor(public dialogRef: MatDialogRef<SlotsForServiceDialogComponent>) {
  }
}
