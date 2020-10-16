import {MatDialogRef} from '@angular/material/dialog';
import {ViewChild} from '@angular/core';
import {BaseFormComponent} from '@shared/common/BaseFormComponent';
import {IReadModel} from '@api/models';

export abstract class CreateDialogComponent {

  @ViewChild('formComponent') protected child: BaseFormComponent<IReadModel>;

  protected constructor(private dialogRef: MatDialogRef<CreateDialogComponent>) {
  }

  onSuccess(event: IReadModel) {
    this.dialogRef.close(event);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.child.submit();
  }
}

