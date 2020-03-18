import {ModelEvent} from '../../../admin-schedule/events/ModelEvent';
import {MatDialogRef} from '@angular/material';

export abstract class CreateDialogComponent {

  protected constructor(private dialogRef: MatDialogRef<CreateDialogComponent>) {}

  onSubmitClicked(event: ModelEvent) {
    this.dialogRef.close(event);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

