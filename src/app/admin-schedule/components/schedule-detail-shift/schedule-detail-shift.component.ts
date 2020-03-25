import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Shift} from '../../../core/models/Shift';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'schedule-detail-shift',
  templateUrl: './schedule-detail-shift.component.html',
  styleUrls: ['./schedule-detail-shift.component.css']
})
export class ScheduleDetailShiftComponent implements OnInit {

  @Input() shift: Shift;
  @Input() shifts: Shift[];
  @Output() idChange = new EventEmitter<number>();

  id = 0;

  constructor() {
  }

  ngOnInit() {
    if (this.shift) {
      this.id = this.shift.id;
    }
  }

  selectionChanged(obj: MatSelectChange) {
    this.shift = this.shifts.find(s => s.id === obj.value);
    this.idChange.emit(obj.value);
  }

}
