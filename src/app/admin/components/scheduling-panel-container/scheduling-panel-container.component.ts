import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Employee} from '@api/models/Employee';

@Component({
  selector: 'admin-scheduling-panel-container',
  templateUrl: './scheduling-panel-container.component.html',
  styleUrls: ['./scheduling-panel-container.component.css']
})
export class SchedulingPanelContainerComponent {

  @Input() employee: Employee;
  @Output() createSelfAppointment = new EventEmitter<void>();
  @Output() createAppointment = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  bookAppointment() {
    this.createAppointment.emit();
  }

  bookSelfAppointment() {
    this.createSelfAppointment.emit();
  }

  closeClick() {
    this.close.emit();
  }

}
