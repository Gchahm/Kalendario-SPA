import {Component} from '@angular/core';
import {BaseDetailsComponent} from '@shared/common/BaseDetailsComponent';
import {Appointment} from '@api/models';

@Component({
  selector: 'admin-self-appointment-details',
  templateUrl: './self-appointment-details.component.html',
  styleUrls: ['./self-appointment-details.component.scss']
})
export class SelfAppointmentDetailsComponent extends BaseDetailsComponent<Appointment> {
}
