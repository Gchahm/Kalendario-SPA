import {Component, OnInit} from '@angular/core';
import {DetailsComponent} from '../../../core/generics/components/DetailsComponent';
import {Service, ServiceWriteModel} from '../../../core/models/Service';

@Component({
  selector: 'admin-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent extends DetailsComponent implements OnInit {

  constructor() {
    super();
  }
  duration = {hours: 0, minutes: 0};

  writeModel: ServiceWriteModel;

  ngOnInit() {
    super.ngOnInit();
    const service = this.model as Service;
    this.duration.hours = service.duration.hours();
    this.duration.minutes = service.duration.minutes();
    this.writeModel = this.onUpdateEvent.model as ServiceWriteModel;
  }

  save() {
    this.writeModel.duration = this.duration.hours + ':' + this.duration.minutes;
    this.onUpdateEvent.model = this.writeModel;
    super.save();
  }
}
