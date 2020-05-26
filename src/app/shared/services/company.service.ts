import { Injectable } from '@angular/core';
import {DjangoRWModelService} from '@core/generics/services/DjangoRWModelService';
import {CompanyAdapter, Company, ICompanyWriteModel} from '@core/models/Company';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends DjangoRWModelService<Company, ICompanyWriteModel> {

  constructor(http: HttpClient,
              adapter: CompanyAdapter,
              ) {
    super(http, adapter,  environment.apiUrl + 'companies/');
  }
}
