import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = environment.apiUrl + 'customers/';

  constructor(private http: HttpClient) { }

  search(search: string) {
    return this.http.get(this.baseUrl + 'search/', {params: {search}});
  }
}
