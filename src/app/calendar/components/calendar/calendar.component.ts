import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CalendarEvent} from '../../models/CalendarEvent';
import {Slot} from '../../models/Slot';
import {TimeOfDay} from '@api/models/TimeOfDay';
import {Moment} from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarHours: TimeOfDay[];
  @Input() minStart = 6;
  @Input() maxStart = 23;

  calendarEvents: Event[];
  @Input('events') set events(events: CalendarEvent[]) {
    this.calendarEvents = events.map(event => Event.fromJson(event));
  }

  @Input('availability') availability: Slot[] = [];

  @Input() showHours = true;
  @Output() eventClick = new EventEmitter<number>();
  @Output() lineClick = new EventEmitter<TimeOfDay>();

  @ViewChild('calendarTable') calendarTable: ElementRef;

  ngOnInit() {
    this.calendarHours = [];
    for (let i = this.minStart; i <= this.maxStart; i++) {
      this.calendarHours.push(new TimeOfDay(i, 0));
      this.calendarHours.push(new TimeOfDay(i, 30));
    }
  }

  eventClicked(id: number) {
    this.eventClick.emit(id);
  }

  emitLineClick(event: TimeOfDay) {
    this.lineClick.emit(event);
  }

  topPosition(event: CalendarEvent): string {
    const value = (event.start.hour() * 60 + event.start.minute() - this.minStart * 60) * 2;
    return value.toString() + 'px';
  }

  eventWidth(): string {
    if (!this.calendarTable) {
      return '60px';
    }
    const div: HTMLElement = this.calendarTable.nativeElement;
    if (this.showHours) {
      return `${div.offsetWidth - 60}px`;
    }
    return `${div.offsetWidth}px`;
  }

  eventLeft() {
    if (this.showHours) {
      return '60px';
    }
    return '0';
  }
}

class Event implements CalendarEvent {
  color: string;
  end: Moment;
  id: number;
  start: Moment;
  title: string;

  height: string;

  constructor(event: CalendarEvent) {
    this.id = event.id;
    this.color = event.color;
    this.end = event.end;
    this.start = event.start;
    this.title = event.title;

    const eventHeight = (event.end.hour() * 60 + event.end.minute()) - (event.start.hour() * 60 + event.start.minute());
    this.height = `${eventHeight * 2}px`;
  }

  static fromJson(event: CalendarEvent): Event {
    return new Event(event);
  }
}
