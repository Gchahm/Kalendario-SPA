import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IEmployee} from '@api/models';
import {Moment} from 'moment';

@Component({
  selector: 'admin-scheduling-page-content',
  templateUrl: './scheduling-page-content.component.html',
  styleUrls: ['./scheduling-page-content.component.css']
})
export class SchedulingPageContentComponent {
  private _employees: IEmployee[];
  @Input() set employees(employees: IEmployee[]) {
    this._employees = employees;
    this.showCalendar = this._employees.length > 0;
  }
  get employees(): IEmployee[] {
    return this._employees;
  }
  @Input() date: Moment;
  @Output() close = new EventEmitter<IEmployee>();

  showCalendar: boolean;

  emitClose(employee: IEmployee) {
    this.close.emit(employee);
  }
}
