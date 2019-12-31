import { Component} from '@angular/core';
import {DetailsComponent} from '../../../core/generics/components/DetailsComponent';
import {IScheduleReadModel} from '../../../core/models/Schedule';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent extends DetailsComponent<IScheduleReadModel> {

  constructor(fb: FormBuilder) {
    super();
  }
}
