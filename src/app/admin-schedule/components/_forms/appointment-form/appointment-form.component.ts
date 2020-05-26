import {Component} from '@angular/core';
import {BaseFormComponent} from '../BaseFormComponent';
import {Appointment} from '@core/models/Appointment';
import {AppointmentService} from '@shared/services/appointment.service';

@Component({
  selector: 'admin-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent extends BaseFormComponent<Appointment> {
  constructor(service: AppointmentService) {
     super(service);
  }
}

