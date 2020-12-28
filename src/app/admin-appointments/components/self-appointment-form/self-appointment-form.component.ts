import {Component, Input} from '@angular/core';
import {BaseFormComponent} from '@shared/common/BaseFormComponent';
import {IAppointment, IAppointmentWriteModel} from '@api/models';
import {modelId} from '@api/models/IReadModel';
import {AppointmentPermissions} from '@api/permissions';

@Component({
  selector: 'admin-self-appointment-form',
  templateUrl: './self-appointment-form.component.html',
  styleUrls: ['./self-appointment-form.component.scss']
})
export class SelfAppointmentFormComponent extends BaseFormComponent<IAppointment> {

  @Input() permissions: AppointmentPermissions;

  writeModel(): IAppointmentWriteModel {
    return {
      id: this.model.id,
      start: this.model.start,
      end: this.model.end,
      customer: null,
      employee: modelId(this.model.employee),
      service: modelId(this.model.service),
      status: this.model.status,
      customerNotes: this.model.customerNotes,
      internalNotes: this.model.internalNotes,
      ignoreAvailability: false
    };
  }

}
