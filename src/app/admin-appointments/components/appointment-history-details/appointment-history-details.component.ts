import { Component } from '@angular/core';
import {BaseDetailsComponent} from '@shared/common/BaseDetailsComponent';
import {Appointment} from '@api/models';

@Component({
  selector: 'admin-appointment-history-details',
  templateUrl: './appointment-history-details.component.html',
  styleUrls: ['./appointment-history-details.component.scss']
})
export class AppointmentHistoryDetailsComponent extends BaseDetailsComponent<Appointment> {
  constructor() {
    super();
  }
}

