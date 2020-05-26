import {MatDialogRef} from '@angular/material/dialog';
import {ViewChild} from '@angular/core';
import {BaseFormComponent} from '@admin-schedule/components/_forms/BaseFormComponent';
import {IReadModel} from '../../models/interfaces/IReadModel';

export abstract class CreateDialogComponent {

  @ViewChild('formComponent') protected child: BaseFormComponent<IReadModel>;

  protected constructor(private dialogRef: MatDialogRef<CreateDialogComponent>) {}

  onSubmitClicked(event: IReadModel) {
    this.dialogRef.close(event);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.child.submit();
  }
}

