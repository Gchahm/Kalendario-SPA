import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Employee} from '../../../../core/models/Employee';
import {CreateDialogComponent} from '../../../../core/generics/components/CreateDialogComponent';

@Component({
  selector: 'admin-create-employee-dialog',
  templateUrl: './create-employee-dialog.component.html',
  styleUrls: ['./create-employee-dialog.component.css']
})
export class CreateEmployeeDialogComponent extends CreateDialogComponent {

  model = new Employee();

  constructor(dialogRef: MatDialogRef<CreateEmployeeDialogComponent>) {
    super(dialogRef);
  }
}

