import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CompanyEmployeeModel} from '@company/state';

@Component({
  selector: 'company-employee-list-card',
  templateUrl: './employee-list-card.component.html',
  styleUrls: ['./employee-list-card.component.css']
})
export class EmployeeListCardComponent {
  @Input() model: CompanyEmployeeModel;
  @Output() selectEmployee = new EventEmitter<number>();
}
