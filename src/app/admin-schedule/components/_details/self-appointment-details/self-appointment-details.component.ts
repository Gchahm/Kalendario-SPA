import { Component} from '@angular/core';
import {BaseDetailsComponent} from '../BaseDetailsComponent';
import {Appointment} from '../../../../core/models/Appointment';

@Component({
  selector: 'admin-self-appointment-details',
  templateUrl: './self-appointment-details.component.html',
  styleUrls: ['./self-appointment-details.component.css']
})
export class SelfAppointmentDetailsComponent extends BaseDetailsComponent<Appointment> {

  constructor() {
    super();
  }
}
