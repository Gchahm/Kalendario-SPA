import {Component, Inject} from '@angular/core';
import {Service, ServiceWriteModel} from '../../../core/models/Service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CreateEmployeeDialogComponent} from '../create-employee/create-employee-dialog.component';
import {CreateDialogComponent} from '../../../core/generics/components/CreateDialogComponent';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service-dialog.component.html',
  styleUrls: ['./create-service-dialog.component.css']
})
export class CreateServiceDialogComponent extends CreateDialogComponent {

  public form: ServiceWriteModel;

  duration = {hours: 0, minutes: 0};

  constructor(public dialogRef: MatDialogRef<CreateEmployeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public services: Service[]) {
    super();
    const service = new Service();
    this.form = service.writeModel();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  result(): ServiceWriteModel {
    this.form.duration = this.duration.hours + ':' + this.duration.minutes;
    return this.form;
  }
}

