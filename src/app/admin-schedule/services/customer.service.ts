import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Customer, CustomerAdapter} from '../../core/models/Customer';
import {Observable} from 'rxjs';
import {DjangoRWModelService} from '../../core/generics/services/DjangoRWModelService';
import {IWriteModel} from '../../core/models/interfaces/IWriteModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends DjangoRWModelService<Customer, IWriteModel> {

  constructor(http: HttpClient,
              customerAdapter: CustomerAdapter) {
    super(http, customerAdapter, environment.apiUrl + 'admin/customers/');
  }

  getPage(params: CustomerQParams): Observable<CustomerListResult> {
    return this.http.get<CustomerListResult>(this.baseUrl, {params: {...params}});
  }
}

export interface CustomerQParams {
  search?: string;
  page?: string;
  page_size?: string;
}

interface CustomerListResult {
  count: number;
  next: string;
  previous: string;
  results: Customer[];
}
