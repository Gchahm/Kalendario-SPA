import {Component, Input, OnInit} from '@angular/core';
import {Shift} from '../../../core/models/Shift';

@Component({
  selector: 'schedule-detail-shift',
  templateUrl: './schedule-detail-shift.component.html',
  styleUrls: ['./schedule-detail-shift.component.css']
})
export class ScheduleDetailShiftComponent implements OnInit {

  @Input() shift: Shift;

  constructor() { }

  ngOnInit() {
  }

}
