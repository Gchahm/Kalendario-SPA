import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RequestItem} from '@api/models/RequestModel';
import {slideOutLeftAnimation, slideOutLeftOnLeaveAnimation} from 'angular-animations';

@Component({
  selector: 'company-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.css'],
  animations: [
    slideOutLeftOnLeaveAnimation()
  ]
})
export class RequestItemComponent {
  @Input() requestItem: RequestItem;
  @Input() showBin: boolean;
  @Output() remove = new EventEmitter<number>();
}
