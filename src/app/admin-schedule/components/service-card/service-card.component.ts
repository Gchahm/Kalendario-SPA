import {Component, OnInit} from '@angular/core';
import {DetailsComponent} from '../../../core/generics/components/DetailsComponent';
import {Service, ServiceWriteModel} from '../../../core/models/Service';

@Component({
  selector: 'admin-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent extends DetailsComponent<Service> implements OnInit {

  constructor() {
    super();
  }

  duration = {hours: 0, minutes: 0};

  ngOnInit() {
    super.ngOnInit();
    this.duration.hours = this.model.duration.hours();
    this.duration.minutes = this.model.duration.minutes();
  }

  save() {
    const model = this.onUpdateEvent.model as ServiceWriteModel;
    model.duration = this.duration.hours + ':' + this.duration.minutes;
    this.onUpdateEvent.model = model;
    super.save();
  }
}
