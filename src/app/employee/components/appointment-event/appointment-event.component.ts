import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Appointment} from '../../../shared/models/Appointment';

@Component({
  selector: 'app-appointment-event',
  templateUrl: './appointment-event.component.html',
  styleUrls: ['./appointment-event.component.css']
})
export class AppointmentEventComponent implements OnInit {

  @Input() appointment: Appointment;
  @Output() onClick = new EventEmitter<Appointment>();

  constructor() { }

  ngOnInit() {
  }

  emitEventClicked() {
    this.onClick.emit(this.appointment);
  }

}
