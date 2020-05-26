import { Component } from '@angular/core';
import {BaseDetailsComponent} from '../BaseDetailsComponent';
import {Appointment} from '@core/models/Appointment';

@Component({
  selector: 'admin-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent extends BaseDetailsComponent<Appointment> {

  constructor() {
    super();
  }

}
