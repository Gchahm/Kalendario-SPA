import {IReadModel} from './IReadModel';
import {Adapter} from '@api/adapter';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {CompanyConfig, IConfigWriteModel} from '@api/models/CompanyConfig';

export class Company implements IReadModel {
  static modelType = 'company';
  id: number;
  name: string;
  address: string;
  avatar: string;
  about: string;
  instagram: string;
  phoneNumber: string;
  whatsapp: string;
  facebook: string;

  config: CompanyConfig;

  static fromJs(data: any): Company {
    data = typeof data === 'object' ? data : {};
    const result = new Company();
    if (data) {
      result.id = data.id;
      result.name = data.name;
      result.address = data.address;
      result.instagram = data.instagram;
      result.phoneNumber = data.phoneNumber;
      result.whatsapp = data.whatsapp;
      result.facebook = data.facebook;
      result.about = data.about;
      result.avatar = data.avatar ? environment.imageStorage + data.avatar : environment.assetUrl + 'img/default-avatar.jpg';
      result.config = CompanyConfig.fromJs(data.config);
    }
    return result;
  }
}

export interface ICompanyWriteModel {
  id: number;
  name: string;
  address: string;
  about: string;
  instagram: string;
  phoneNumber: string;
  whatsapp: string;
  facebook: string;
  config?: IConfigWriteModel;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyAdapter implements Adapter<Company> {
  adapt(data: any): Company {
    return data === null ? null : Company.fromJs(data);
  }
}
