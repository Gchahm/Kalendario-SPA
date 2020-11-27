import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Employee} from '@api/models';
import {Moment} from 'moment';

@Component({
  selector: 'admin-scheduling-page-content',
  templateUrl: './scheduling-page-content.component.html',
  styleUrls: ['./scheduling-page-content.component.css']
})
export class SchedulingPageContentComponent {
  @Input() employees: Employee[];
  @Input() date: Moment;
  @Output() close = new EventEmitter<Employee>();

  emitClose(employee: Employee) {
    this.close.emit(employee);
  }
}
