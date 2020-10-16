import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {ServiceSlot} from '@company/state';
import {Service} from '@api/models';
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, flipInYOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'company-slots-for-service',
  templateUrl: './slots-for-service.component.html',
  styleUrls: ['./slots-for-service.component.scss'],
  animations: [
    flipInYOnEnterAnimation(),
    fadeInOnEnterAnimation({delay: 500}),
    fadeOutOnLeaveAnimation({duration: 300})
  ]
})
export class SlotsForServiceComponent {
  @Input() serviceSlots: ServiceSlot[];
  @Input() currentSlotId: number;
  @Input() isMobile = false;
  @Input() isLoading = false;
  @Input() hasShadow = true;
  @Input() disableDateInput = true;

  @Input() set date(value: Moment) {
    this.currentDate = value;
    this.nextDate = value.clone().add(1, 'd');
    this.currentDateFormatted = this.currentDate.format('ddd DD/MM/YYYY');
    this.nextDayFormatted = this.nextDate.format('ddd DD/MM/YYYY');
  }

  @Input() service: Service;

  @Output() dateChange = new EventEmitter<Moment>();
  @Output() book = new EventEmitter<void>();

  currentDate: Moment;
  nextDate: Moment;
  currentDateFormatted: string;
  nextDayFormatted: string;
  disabledTooltip = 'remove items from cart to update the date';

  today() {
    this.dateChange.emit(moment.utc());
  }

  previousDay() {
    this.dateChange.emit(this.currentDate.subtract(1, 'day'));
  }

  nextDay() {
    this.dateChange.emit(this.currentDate.add(1, 'day'));
  }

  currentDateSlots(): ServiceSlot[] {
    return this.serviceSlots.filter(s => s.start.date() === this.currentDate.date());
  }

  nextDaySlots(): ServiceSlot[] {
    return this.serviceSlots.filter(s => s.start.date() === this.nextDate.date());
  }
}
