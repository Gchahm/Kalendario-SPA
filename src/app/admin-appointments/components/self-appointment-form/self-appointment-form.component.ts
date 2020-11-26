import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseFormComponent} from '@shared/common/BaseFormComponent';
import {Appointment, IAppointmentWriteModel} from '@api/models';
import {modelId} from '@api/models/IReadModel';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Moment} from 'moment';

@Component({
  selector: 'admin-self-appointment-form',
  templateUrl: './self-appointment-form.component.html',
  styleUrls: ['./self-appointment-form.component.scss']
})
export class SelfAppointmentFormComponent extends BaseFormComponent<Appointment> {

  writeModel(): IAppointmentWriteModel {
    return {
      id: this.model.id,
      start: this.model.start,
      end: this.model.end,
      customer: modelId(this.model.customer),
      employee: modelId(this.model.employee),
      service: modelId(this.model.service),
      status: this.model.status,
      customerNotes: this.model.customerNotes,
      internalNotes: this.model.internalNotes,
      ignoreAvailability: false
    };
  }

}
