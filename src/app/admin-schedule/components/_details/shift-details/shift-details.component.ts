import {Component} from '@angular/core';
import {Shift} from '@core/models/Shift';
import {BaseDetailsComponent} from '../BaseDetailsComponent';

@Component({
  selector: 'admin-shift-details',
  templateUrl: './shift-details.component.html',
  styleUrls: ['./shift-details.component.scss']
})
export class ShiftDetailsComponent extends BaseDetailsComponent<Shift> {
  constructor() {
    super();
  }
}
