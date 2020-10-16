import { Component } from '@angular/core';
import {BaseRWComponent} from '@shared/common/BaseRWComponent';
import {IServiceWriteModel} from '@api/models';
import {ServiceFullModel} from '@app/admin-services/state';

@Component({
  selector: 'admin-service-rw',
  templateUrl: './service-rw.component.html',
  styleUrls: ['./service-rw.component.css']
})
export class ServiceRwComponent extends BaseRWComponent<ServiceFullModel> {
  writeModel(): IServiceWriteModel {
    return {
      id: this.model.id,
      private: this.model.private,
      category: this.model.category,
      name: this.model.name,
      duration: this.model.duration.toISOString(),
      cost: this.model.cost,
      isFrom: this.model.isFrom,
      color: this.model.color,
      description: this.model.description
    };
  }
}
