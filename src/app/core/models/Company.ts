import {IReadModel} from './interfaces/IReadModel';
import {IWriteModel} from './interfaces/IWriteModel';
import {Adapter} from '../interfaces/adapter';
import {Injectable} from '@angular/core';

export class Company implements IReadModel {
  static modelType = 'company';
  id: number;
  name: string;

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
  adapt(item: any): Company {
    return adaptCompany(item);
  }
}

export function adaptCompany(item: any): Company {
  if (item === null) return null;
  const company = new Company();
  company.id = item.id;
  company.name = item.name;
  return company;
}
