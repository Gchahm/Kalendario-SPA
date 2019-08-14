import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Customer} from '../../staff-services/models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = environment.apiUrl + 'customers/register/';

  constructor(private http: HttpClient) { }

  register(user: Customer) {
    return this.http.post(this.baseUrl, user);
  }
}
