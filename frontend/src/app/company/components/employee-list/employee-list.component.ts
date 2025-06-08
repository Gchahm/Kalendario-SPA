import {Component, Input} from '@angular/core';
import {CompanyEmployeeModel} from '@company/state';
import {staggeredFadeInAnimation} from '@app/animations';

@Component({
  selector: 'company-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  animations: [
    staggeredFadeInAnimation
  ]
})
export class EmployeeListComponent {
  @Input() employees: CompanyEmployeeModel[];
  @Input() companyName: string;
}
