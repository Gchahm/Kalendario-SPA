import {Component, Input} from '@angular/core';
import {Employee} from '@api/models';

@Component({
  selector: 'company-employee-details-card',
  templateUrl: './employee-details-card.component.html',
  styleUrls: ['./employee-details-card.component.css']
})
export class EmployeeDetailsCardComponent {
  @Input() employee: Employee;
  @Input() companyName: string;
  // TODO: Implement details button
}
