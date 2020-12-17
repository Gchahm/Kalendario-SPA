import {Component, Input} from '@angular/core';
import {Moment} from 'moment';

@Component({
  selector: 'app-date-round-button',
  templateUrl: './date-round-button.component.html',
  styleUrls: ['./date-round-button.component.css']
})
export class DateRoundButtonComponent {
  @Input() active: boolean;
  @Input() date: Moment;
}
