import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Moment} from 'moment';
import {IAppointment} from '@api/models';
import * as moment from 'moment';
import {ModelPermissions} from '@api/permissions';
import {IEmployeeResourceModel} from '@api/models/IEmployeeResourceModel';
import {getShift} from '@api/models/ISchedule';

@Component({
  selector: 'employee-schedule-page-container',
  templateUrl: './employee-schedule-page-container.component.html',
  styleUrls: ['./employee-schedule-page-container.component.scss']
})
export class EmployeeSchedulePageContainerComponent implements OnInit {
  @Input() currentDate: Moment;
  @Input() appointments: IAppointment[];
  @Input() permissions: ModelPermissions;
  @Input() employee: IEmployeeResourceModel;
  @Input() isMobile: boolean;
  @Output() updateCurrent = new EventEmitter<Moment>();
  @Output() add = new EventEmitter<Moment>();

  startDate: Moment;
  endDate: Moment;
  timeSpan: number;

  ngOnInit() {
    this.timeSpan = this.isMobile ? 2 : 3;
    this.startDate = moment().utc().startOf('day').subtract(this.timeSpan, 'day');
    this.endDate = moment().utc().startOf('day').add(this.timeSpan, 'day');
  }

  dates(): Moment[] {
    const dates = [];
    let controlDate = moment.utc(this.startDate.toISOString());
    while (controlDate.isBefore(this.endDate) || controlDate.isSame(this.endDate)) {
      dates.push(moment.utc(controlDate.toISOString()));
      controlDate = controlDate.clone().add(1, 'day');
    }
    return dates;
  }

  isCurrent(date: Moment) {
    return this.currentDate.format('DDMMYYYY') === date.format('DDMMYYYY');
  }

  emitDate(date: Moment) {
    this.updateCurrent.emit(date);

    if (date.isAfter(this.endDate)) {
      this.startDate = date;
      this.endDate = moment.utc(date.toISOString()).add(this.timeSpan * 2, 'day');
    }
    if (date.isBefore(this.startDate)) {
      this.startDate = moment.utc(date.toISOString()).subtract(this.timeSpan * 2, 'day');
      this.endDate = date;
    }
  }

  nextDay() {
    this.emitDate(this.currentDate.clone().add(1, 'day'));
  }

  previousDay() {
    this.emitDate(this.currentDate.clone().subtract(1, 'day'));
  }

  availability(): string {
    const shift = getShift(this.employee.scheduleModel, this.currentDate);
    if (shift?.frames.length > 0) {
      return shift.frames.map(f => f.name).reduce((previousValue, currentValue) => previousValue + ' | ' + currentValue);
    }
    return 'No Availability';
  }
}
