import {Component, Inject} from '@angular/core';
import {Appointment} from '@core/models/Appointment';
import {ModelEvent} from '../../../events/ModelEvent';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IReadModel} from '@core/models/interfaces/IReadModel';

@Component({
  selector: 'employee-appointment-event',
  templateUrl: './appointment-event-dialog.component.html',
  styleUrls: ['./appointment-event-dialog.component.scss']
})
export class AppointmentEventDialogComponent {

  editMode = false;
  model: Appointment;
  type;

  constructor(public dialogRef: MatDialogRef<AppointmentEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment }) {
    this.model = data.appointment;
    if (this.model.service && this.model.service.id !== 0) {
      this.type = 'SERVICE';
    } else {
      this.type = 'SELF';
    }
  }

  onSubmitClicked(event: IReadModel) {
    this.dialogRef.close(event);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit() {
    this.editMode = true;
  }

  cancel() {
    this.editMode = false;
  }

  delete() {
    const event: ModelEvent = {action: 'DELETE', model: this.model.writeModel()};
    this.dialogRef.close(event);
  }
}
