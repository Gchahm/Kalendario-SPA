import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RequestModel} from '@api/models';

@Component({
  selector: 'company-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  @Input() request: RequestModel;
  @Input() checkoutMode: boolean;
  @Output() remove = new EventEmitter<number>();
}
