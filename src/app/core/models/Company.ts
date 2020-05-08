import {IReadModel} from './interfaces/IReadModel';
import {IWriteModel} from './interfaces/IWriteModel';
import {Adapter} from '../interfaces/adapter';
import {Injectable} from '@angular/core';

export class Company implements IReadModel {
  static modelType = 'company';
  id: number;
  name: string;

  static fromJs(data: any): Company {
    data = typeof data === 'object' ? data : {};
    const result = new Company();
    result.init(data);
    return result;
  }

  init(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
    }
  }

  writeModel(): IWriteModel {
    return undefined;
  }
}

export interface ICompanyWriteModel extends IWriteModel {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyAdapter implements Adapter<Company> {
  adapt(data: any): Company {
    return data === null ? null : Company.fromJs(data);
  }
}
