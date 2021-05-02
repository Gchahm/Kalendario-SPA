import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CalendarEvent} from '../../models/CalendarEvent';
import {Slot} from '../../models/Slot';
import {TimeOfDay} from '@api/models/TimeOfDay';
import {Moment} from 'moment';
import * as moment from 'moment';
import {CalendarComponents} from '@app/admin-scheduling/components/commom/CalendarComponents';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends CalendarComponents implements OnInit {

  calendarEvents: Event[];

  @Input() set events(events: CalendarEvent[]) {
    this.calendarEvents = events.map(event => Event.fromJson(event, this.date));
  }

  @Input() availability: Slot[] = [];
  @Output() eventClick = new EventEmitter<number>();
  @Output() lineClick = new EventEmitter<TimeOfDay>();

  @ViewChild('calendarTable') calendarTable: ElementRef;

  eventClicked(id: number) {
    this.eventClick.emit(id);
  }

  emitLineClick(event: TimeOfDay) {
    this.lineClick.emit(event);
  }

  topPosition(event: CalendarEvent): string {
    const value = event.start < this.date ? 0 : (event.start.hour() * 60 + event.start.minute() - this.minStart * 60) * 2;
    return value.toString() + 'px';
  }

  eventWidth(): string {
    if (!this.calendarTable) {
      return '60px';
    }
    const div: HTMLElement = this.calendarTable.nativeElement;
    return `${div.offsetWidth}px`;
  }
}

class Event implements CalendarEvent {
  color: string;
  end: Moment;
  id: number;
  start: Moment;
  title: string;

  height: string;

  constructor(event: CalendarEvent, currentDate: Moment) {
    this.id = event.id;
    this.color = event.color;
    this.end = event.end;
    this.start = event.start < currentDate ? event.start.clone().set({h: 6, m: 0}) : event.start;
    this.title = event.title;

    if (event.end.clone().startOf('day') > currentDate.startOf('day')) {
      const eventHeight = 24 * 60 - (this.start.hour() * 60 + this.start.minute());
      this.height = `${eventHeight * 2}px`;
    } else {
      const eventHeight = (event.end.hour() * 60 + event.end.minute()) - (this.start.hour() * 60 + this.start.minute());
      this.height = `${eventHeight * 2}px`;
    }
  }

  static fromJson(event: CalendarEvent, currentDate: Moment): Event {
    return new Event(event, currentDate);
  }
}
