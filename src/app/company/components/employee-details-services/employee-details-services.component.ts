import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service} from '@api/models';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';
import {staggeredFadeInAnimation} from '@app/animations';

@Component({
  selector: 'company-employee-details-services',
  templateUrl: './employee-details-services.component.html',
  styleUrls: ['./employee-details-services.component.css'],
  animations: [
    staggeredFadeInAnimation
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
