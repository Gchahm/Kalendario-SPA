import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from '../../models/Appointment';
import {Duration} from 'moment';

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

  beautify(duration: Duration) {
    let result = '';
    if (duration.hours() > 0 ) {
      result += duration.hours().toString() + (duration.hours() > 1 ? ' hrs ' : ' hour ');
    }
    if (duration.minutes() > 0 ) {
      result += duration.minutes().toString() + 'min';
    }
    return result;
  }
}
