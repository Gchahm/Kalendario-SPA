import {IReadModel} from './interfaces/IReadModel';
import {IWriteModel} from './interfaces/IWriteModel';
import {Adapter} from '../interfaces/adapter';
import {Injectable} from '@angular/core';

export class Company implements ICompanyReadModel {
  id: number;
  name: string;

  writeModel(): IWriteModel {
    return undefined;
  }
}

export interface ICompanyReadModel extends IReadModel {
  name: string;
}

export interface ICompanyWriteModel extends IWriteModel {
  name: string;
}

  @Injectable({
  providedIn: 'root'
})
export class CompanyAdapter implements Adapter<ICompanyReadModel> {
  adapt(item: any): ICompanyReadModel {
    const company = new Company();
    company.id = item.id;
    company.name = item.name;
    return company;
  }

}
