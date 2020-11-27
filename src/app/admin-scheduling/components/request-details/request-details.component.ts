import {Component, EventEmitter, Output} from '@angular/core';
import {BaseDetailsComponent} from '@shared/common/BaseDetailsComponent';
import {RequestModel} from '@api/models';

@Component({
  selector: 'admin-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent extends BaseDetailsComponent<RequestModel> {
  @Output() reject = new EventEmitter<number>();
  @Output() accept = new EventEmitter<number>();
}
