import {Component} from '@angular/core';
import {Service} from '@core/models/Service';
import {BaseFormComponent} from '../BaseFormComponent';
import {ServiceService} from '../../../services/service.service';

@Component({
  selector: 'admin-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
})
export class ServiceFormComponent extends BaseFormComponent<Service> {
  constructor(service: ServiceService) {
    super(service);
  }
}
