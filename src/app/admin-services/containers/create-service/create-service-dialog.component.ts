import {Component} from '@angular/core';
import {Service} from '@api/models';
import {CreateDialogComponent} from '@core/generics/components/CreateDialogComponent';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service-dialog.component.html',
  styleUrls: ['./create-service-dialog.component.scss']
})
export class CreateServiceDialogComponent extends CreateDialogComponent {

  public model = new Service();

  constructor(dialogRef: MatDialogRef<CreateServiceDialogComponent>) {
    super(dialogRef);
  }

}

