import { Component } from '@angular/core';
import {BaseFormComponent} from '@shared/common/BaseFormComponent';
import {IServiceCategoryWriteModel, ServiceCategory} from '@api/models/ServiceCategory';

@Component({
  selector: 'app-service-category-form',
  templateUrl: './service-category-form.component.html',
  styleUrls: ['./service-category-form.component.css']
})
export class ServiceCategoryFormComponent extends BaseFormComponent<ServiceCategory>{
  writeModel(): IServiceCategoryWriteModel {
    return {
      id: this.model.id,
      name: this.model.name,
      color: this.model.color,
    };
  }
}
