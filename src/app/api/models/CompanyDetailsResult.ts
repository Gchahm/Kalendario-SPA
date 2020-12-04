import {IReadModel} from './IReadModel';
import {Adapter} from '@api/adapter';
import {Injectable} from '@angular/core';
import {Employee, IEmployee} from './IEmployee';
import {Service} from './Service';
import {CompanyConfig} from '@api/models/CompanyConfig';
import {ServiceCategory} from '@api/models/ServiceCategory';
import {environment} from '../../../environments/environment';

export class CompanyDetailsResult implements IReadModel {
  static modelType = 'company';
  id: number;
  name: string;
  address: string;
  avatar: string;
  about: string;
  employees: IEmployee[];
  services: Service[];
  serviceCategories: ServiceCategory[];
  config: CompanyConfig;

  static fromJs(data: any): CompanyDetailsResult {
    data = typeof data === 'object' ? data : {};
    const result = new CompanyDetailsResult();
    result.init(data);
    return result;
  }

  writeModel() {
  }

  init(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.address = data.address;
      this.about = data.about;
      this.avatar = data.avatar ? environment.imageStorage + data.avatar : environment.assetUrl + 'img/default-avatar.jpg';
      this.employees = data.employees.map(employee => Employee.fromJs(employee));
      this.services = data.services.map(service => Service.fromJs(service));
      this.serviceCategories = data.serviceCategories.map(cat => ServiceCategory.fromJs(cat));
      this.config = CompanyConfig.fromJs(data.config);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsResultAdapter implements Adapter<CompanyDetailsResult> {
  adapt(data: any): CompanyDetailsResult {
    return data === null ? null : CompanyDetailsResult.fromJs(data);
  }
}
