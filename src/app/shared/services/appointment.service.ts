import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Appointment, AppointmentAdapter} from '../models/Appointment';
import {Moment} from 'moment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {adaptList} from '../adapter';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = environment.apiUrl + 'appointments/';

  constructor(private http: HttpClient,
              private adapter: AppointmentAdapter) { }

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl).pipe(
      map(adaptList(this.adapter))
    );
  }

  getEmployeeAppointments(employee: string, year, month, day) {
    const params = { employee, year, month, day };
    return this.http.get<Appointment[]>(this.baseUrl, {params}).pipe(
      map(adaptList(this.adapter))
    );
  }

  get(id: string) {
    return this.http.get<Appointment>(this.baseUrl + id + '/');
  }

  create(employee, customer, service, start: Moment) {
    console.log({employee, customer, service, start});
    return this.http.post<Appointment>(this.baseUrl, {employee, customer, service, start});
  }
}
