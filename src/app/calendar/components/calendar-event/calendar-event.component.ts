import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarEvent} from '../../models/CalendarEvent';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.css']
})
export class CalendarEventComponent implements OnInit {

  @Input() calendarEvent: CalendarEvent;

  @Output() onClick = new EventEmitter<CalendarEvent>();

  constructor() { }

  ngOnInit() {
  }

  emitEventClicked() {
    this.onClick.emit(this.calendarEvent);
  }

}
