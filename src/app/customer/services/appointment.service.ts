import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Appointment, AppointmentAdapter} from '../../shared/models/Appointment';
import {Moment} from 'moment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {adaptList} from '../../shared/adapter';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = environment.apiUrl + 'customer/appointments/';

  constructor(private http: HttpClient,
              private adapter: AppointmentAdapter) { }

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl).pipe(
      map(adaptList(this.adapter))
    );
  }

  get(id: string) {
    return this.http.get<Appointment>(this.baseUrl + id + '/');
  }

  create(employee, service, start: Moment) {
    return this.http.post<Appointment>(this.baseUrl, {employee, service, start});
  }
}
