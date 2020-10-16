import {Component} from '@angular/core';
import {CreateDialogComponent} from '@core/generics/components/CreateDialogComponent';
import {MatDialogRef} from '@angular/material/dialog';
import {Employee} from '@api/models';

@Component({
  selector: 'admin-create-employee-dialog',
  templateUrl: './create-employee-dialog.component.html',
  styleUrls: ['./create-employee-dialog.component.scss']
})
export class CreateEmployeeDialogComponent extends CreateDialogComponent {

  model = new Employee();

  constructor(dialogRef: MatDialogRef<CreateEmployeeDialogComponent>) {
    super(dialogRef);
  }
}

