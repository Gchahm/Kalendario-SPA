import {Component} from '@angular/core';
import {BaseDetailsComponent} from '@shared/common/BaseDetailsComponent';
import {IAppointment} from '@api/models';

@Component({
  selector: 'admin-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent extends BaseDetailsComponent<IAppointment> {
  constructor() {
    super();
  }
}
