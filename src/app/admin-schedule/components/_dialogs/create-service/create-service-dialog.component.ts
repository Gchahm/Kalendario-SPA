import {Component} from '@angular/core';
import {Service} from '../../../../core/models/Service';
import {MatDialogRef} from '@angular/material';
import {CreateDialogComponent} from '../../../../core/generics/components/CreateDialogComponent';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service-dialog.component.html',
  styleUrls: ['./create-service-dialog.component.css']
})
export class CreateServiceDialogComponent extends CreateDialogComponent {

  public model = new Service();

  constructor(dialogRef: MatDialogRef<CreateServiceDialogComponent>) {
    super(dialogRef);
  }

}

