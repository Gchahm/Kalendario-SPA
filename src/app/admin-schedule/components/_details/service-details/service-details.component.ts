import {Component} from '@angular/core';
import {Service} from '../../../../core/models/Service';
import {BaseDetailsComponent} from '../BaseDetailsComponent';

@Component({
  selector: 'admin-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent extends BaseDetailsComponent<Service> {
  constructor() {
    super();
  }
}
