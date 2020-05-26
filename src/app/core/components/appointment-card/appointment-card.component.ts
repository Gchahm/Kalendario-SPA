import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from '../../models/Appointment';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss']
})
export class AppointmentCardComponent implements OnInit {

  @Input() appointment: Appointment;

  constructor() { }

  ngOnInit() {
  }
}
