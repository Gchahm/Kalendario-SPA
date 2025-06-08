import {
  AfterViewChecked, AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {RequestModel} from '@api/models';
import * as moment from 'moment';
import {MatCalendar, MatCalendarCellCssClasses, MatCalendarHeader} from '@angular/material/datepicker';
import {DateAdapter} from '@angular/material/core';
import {Moment} from 'moment';

@Component({
  selector: 'customers-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements AfterViewChecked, AfterViewInit {

  _requests: RequestModel[];
  @Input() set requests(value: RequestModel[]) {
    this._requests = value;
    if (!!this.calendar) { this.calendar.updateTodaysDate(); }
  }
  get requests(): RequestModel[] {
    return this._requests;
  }

  @Input() selected: RequestModel;
  @Output() monthSelected = new EventEmitter<Moment>();
  @Output() select = new EventEmitter<number>();

  @ViewChild(MatCalendar, {static: false}) calendar: MatCalendar<Moment>;
  @ViewChild(MatCalendarHeader, {static: false}) calendarHeader: MatCalendarHeader<Moment>;

  currentMonth: string = null;
  _date = moment.utc();
  get date() {
    return this._date;
  }
  set date(value: Moment) {
    this._date = value;
    const request = this.requests.find(r => r.scheduledDate === value.toISOString().substring(0, 10));
    if (!!request) { this.select.emit(request.id); }
  }

  constructor(private adapter: DateAdapter<Moment>) {
  }

  ngAfterViewInit() {
    this.currentMonth = this.calendar.monthView._monthLabel;
   }

  ngAfterViewChecked() {
    this.loadEvents();
    this.paintCalendar();
  }

  loadEvents() {
    if (!!this.calendar && !!this.calendar.monthView && this.currentMonth !== this.calendar.monthView._monthLabel) {
      this.currentMonth = this.calendar.monthView._monthLabel;
      const month = this.adapter.getMonthNames('short').map(m => m.toLowerCase()).indexOf(this.currentMonth.toLowerCase());
      const year = +this.calendarHeader.periodButtonText.substring(this.currentMonth.length + 1);
      const t = this.adapter.createDate(year, month, 1);
      this.monthSelected.emit(t);
    }
  }

  paintCalendar() {
    const collection = document.getElementsByClassName('special-date');
    const days = Array.from(collection);
    for (const [i, day] of days.entries()) {
      if (day.children.length === 1) {
        const div = document.createElement('div');
        div.classList.add('under-bar');
        div.style.backgroundColor = this.getColor(i);
        day.appendChild(div);
      }
    }
  }

  dateClass(): (date: Date) => MatCalendarCellCssClasses {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.requests.map(r => r.scheduledDate)
        .some(d => d === date.toISOString().substring(0, 10));
      return highlightDate ? 'special-date' : '';
    };
  }

  getColor(i: number): string {
    const colors = ['#0DB4B9', '#F2A1A1', '#E76D89', '#E1621A', '#E9422C', '#FF0E48', '#15D0C5', '#FF4EED',
      '#2C57F0', '#9A2CF0', '#0DB952'];
    return colors[i % colors.length];
  }
}
