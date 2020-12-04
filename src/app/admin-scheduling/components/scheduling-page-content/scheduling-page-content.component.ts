import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IEmployee} from '@api/models';
import {Moment} from 'moment';

@Component({
  selector: 'admin-scheduling-page-content',
  templateUrl: './scheduling-page-content.component.html',
  styleUrls: ['./scheduling-page-content.component.css']
})
export class SchedulingPageContentComponent {
  @Input() employees: IEmployee[];
  @Input() date: Moment;
  @Output() close = new EventEmitter<IEmployee>();

  emitClose(employee: IEmployee) {
    this.close.emit(employee);
  }
}
