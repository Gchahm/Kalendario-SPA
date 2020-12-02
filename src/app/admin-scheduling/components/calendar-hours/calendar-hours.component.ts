import {Component, OnInit} from '@angular/core';
import {CalendarComponents} from '@app/admin-scheduling/components/commom/CalendarComponents';

@Component({
  selector: 'app-calendar-hours',
  templateUrl: './calendar-hours.component.html',
  styleUrls: ['./calendar-hours.component.scss']
})
export class CalendarHoursComponent extends CalendarComponents implements OnInit {
}
