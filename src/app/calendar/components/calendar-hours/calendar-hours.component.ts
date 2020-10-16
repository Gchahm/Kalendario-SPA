import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar-hours',
  templateUrl: './calendar-hours.component.html',
  styleUrls: ['./calendar-hours.component.css']
})
export class CalendarHoursComponent implements OnInit {

  calendarHours: number[];
  @Input() minStart = 6;
  @Input() maxStart = 23;

  ngOnInit() {
    this.calendarHours = [];
    for (let i = this.minStart; i <= this.maxStart; i++) {
      this.calendarHours.push(i);
    }
  }
}
