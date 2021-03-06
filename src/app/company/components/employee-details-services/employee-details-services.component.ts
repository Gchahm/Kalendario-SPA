import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service} from '@api/models';
import {staggeredFadeInAnimation} from '@app/animations';
import {fadeOutOnLeaveAnimation} from 'angular-animations';

@Component({
  selector: 'company-employee-details-services',
  templateUrl: './employee-details-services.component.html',
  styleUrls: ['./employee-details-services.component.css'],
  animations: [
    staggeredFadeInAnimation,
    fadeOutOnLeaveAnimation({duration: 300})
  ]
})
export class EmployeeDetailsServicesComponent {
  searchValue: string;
  @Input() services: Service[];
  @Input() selected: number;

  @Input() set search(value: string) {
    this.searchValue = value;
  }

  @Output() searchChange = new EventEmitter<string>();
  @Output() select = new EventEmitter<number>();
}
