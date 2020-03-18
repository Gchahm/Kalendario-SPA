import {Component, OnInit} from '@angular/core';
import {Service, ServiceWriteModel} from '../../../../core/models/Service';
import {BaseFormComponent} from '../BaseFormComponent';

@Component({
  selector: 'admin-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent extends BaseFormComponent<Service> implements OnInit {

  duration = {hours: 0, minutes: 0};

  constructor() {
    super();
  }

  submitModel() {
    const model = this.onUpdateEvent.model as ServiceWriteModel;
    model.duration = this.duration.hours + ':' + this.duration.minutes;
    return model;
  }

  createForm() {
    this.duration.hours = this.model.duration.hours();
    this.duration.minutes = this.model.duration.minutes();
  }

}
