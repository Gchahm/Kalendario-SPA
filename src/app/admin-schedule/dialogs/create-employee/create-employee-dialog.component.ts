import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EmployeeWriteModel} from '../../../core/models/Employee';
import {Service} from '../../../core/models/Service';
import {CreateDialogComponent} from '../../../core/generics/components/CreateDialogComponent';

@Component({
  selector: 'admin-create-employee-dialog',
  templateUrl: './create-employee-dialog.component.html',
  styleUrls: ['./create-employee-dialog.component.css']
})
export class CreateEmployeeDialogComponent implements CreateDialogComponent {

  form = new CreateEmployeeForm();

  constructor(public dialogRef: MatDialogRef<CreateEmployeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public services: Service[]) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

class CreateEmployeeForm {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  instagram: string;
  bio: string;
  photoUrl: string;
  services: string[];
  schedule: string;

  createModel(): EmployeeWriteModel {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      bio: this.bio,
      email: this.email,
      instagram: this.instagram,
      phone: this.phone,
      photoUrl: this.photoUrl,
      services: this.services,
      schedule: this.schedule
    };
  }
}
