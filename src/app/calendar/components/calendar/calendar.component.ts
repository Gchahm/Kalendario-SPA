import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CalendarEvent} from '../../models/CalendarEvent';
import {Slot} from '../../models/Slot';
import {TimeOfDay} from '@core/models/TimeOfDay';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  @Input('min-time') minStart = 6;
  @Input('max-time') maxStart = 23;

  @Input('events') events: CalendarEvent[] = [];
  @Input('availability') availability: Slot[] = [];

  @ViewChild('calendarTable') calendarTable: ElementRef;

  calendarHours: number[];

  constructor() {
    this.calendarHours = [];
    for (let i = this.minStart; i <= this.maxStart; i++) {
      this.calendarHours.push(i);
    }
  }

  topPosition(event: CalendarEvent): string {
    const value = event.start.hour() * 60 + event.start.minute() - this.minStart * 60;
    return value.toString() + 'px';
  }

  eventHeight(event: CalendarEvent): string {
    const eventHeight = (event.end.hour() * 60 + event.end.minute()) - (event.start.hour() * 60 + event.start.minute());
    return `${eventHeight}px`;
  }

  eventWidth(): string {
    const div: HTMLElement = this.calendarTable.nativeElement;
    return `${div.offsetWidth - 60}px`;
  }

  calendarHeight() {
    const el = document.getElementById('calendar-table-container');
    const topOffset = el.getBoundingClientRect().top;
    let value = (window.innerHeight - topOffset - 100);
    value = value < 400 ? 400 : value;
    return value.toString() + 'px';
  }

  backGroundColor(hour: number, minute: number) {
    const hr =  new TimeOfDay(hour, minute);
    for (const slot of this.availability) {
      if (slot.start.hashCode() <= hr.hashCode() && slot.end.hashCode() > hr.hashCode()) {
        return 'white';
      }
    }
    return '#cccccc';
  }
}
