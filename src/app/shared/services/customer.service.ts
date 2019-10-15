import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Customer} from '../../core/models/Customer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = environment.apiUrl + 'customers/';

  constructor(private http: HttpClient) { }

  all(params: CustomerQParams): Observable<CustomerListResult> {
    return this.http.get<CustomerListResult>(this.baseUrl, {params: {...params}});
  }

  create(model: CreateCustomer) {
    return this.http.post<Customer>(this.baseUrl, model);
  }
}

export interface CustomerQParams {
  search?: string;
  page?: string;
  page_size?: string;
}

export interface CreateCustomer {
  first_name: string;
  last_name: string;
  phone: string;
}

interface CustomerListResult {
  count: number;
  next: string;
  previous: string;
  results: Customer[];
}
