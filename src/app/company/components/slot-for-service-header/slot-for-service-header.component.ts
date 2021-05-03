import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

@Component({
  selector: 'company-slot-for-service-header',
  templateUrl: './slot-for-service-header.component.html',
  styleUrls: ['./slot-for-service-header.component.css']
})
export class SlotForServiceHeaderComponent  {
  @Input() disableDateInput = true;
  @Input() currentDate: Moment;
  @Input() isMobile = false;
  @Input() currentSlotId: number;
  @Output() dateChange = new EventEmitter<Moment>();
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

}
