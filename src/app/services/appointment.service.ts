import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Appointment} from '../models/Appointment';
import {Moment} from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = environment.apiUrl + 'appointments/';

  constructor(private http: HttpClient) { }

  getAll(employee: string, year, month, day) {
    const params = { employee, year, month, day };
    return this.http.get<Appointment[]>(this.baseUrl, {params});
  }

  get(id: string) {
    return this.http.get<Appointment>(this.baseUrl + id + '/');
  }

  create(employee, customer, service, start: Moment) {
    console.log({employee, customer, service, start});
    return this.http.post<Appointment>(this.baseUrl, {employee, customer, service, start});
  }
}
