import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service} from '@api/models';

@Component({
  selector: 'company-service-list-card',
  templateUrl: './service-list-card.component.html',
  styleUrls: ['./service-list-card.component.scss']
})
export class ServiceListCardComponent {
  @Input() service: Service;
  @Input() checked: boolean;
  @Output() selected = new EventEmitter<number>();
}
