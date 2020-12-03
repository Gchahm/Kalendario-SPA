import { Component } from '@angular/core';
import {BaseDetailsComponent} from '@shared/common/BaseDetailsComponent';
import {IAppointment} from '@api/models';
import {IAppointmentHistory} from '@api/models/AppointmentHistory';
import {HistoryType} from '@api/models/HistoryType';

@Component({
  selector: 'admin-appointment-history-details',
  templateUrl: './appointment-history-details.component.html',
  styleUrls: ['./appointment-history-details.component.scss']
})
export class AppointmentHistoryDetailsComponent extends BaseDetailsComponent<IAppointmentHistory> {
  historyType = HistoryType;

  constructor() {
    super();
  }
}

