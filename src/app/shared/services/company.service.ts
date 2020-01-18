import { Injectable } from '@angular/core';
import {DjangoRWModelService} from '../../core/generics/services/DjangoRWModelService';
import {CompanyAdapter, ICompanyReadModel, ICompanyWriteModel} from '../../core/models/Company';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends DjangoRWModelService<ICompanyReadModel, ICompanyWriteModel> {
  constructor(http: HttpClient,
              private companyAdapter: CompanyAdapter) {
    super(http, companyAdapter, environment.apiUrl + 'companies/');
  }
}
