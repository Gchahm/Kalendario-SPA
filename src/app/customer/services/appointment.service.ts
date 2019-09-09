import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Appointment, AppointmentAdapter} from '../../shared/models/Appointment';
import {Moment} from 'moment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {adaptList} from '../../shared/adapter';
import {EmployeeAdapter} from '../../shared/models/Employee';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = environment.apiUrl + 'appointments/';

  constructor(private http: HttpClient,
              private adapter: AppointmentAdapter,
              private empAdapter: EmployeeAdapter) { }

  getAll(status: string) {
      return this.getList(status, {});
    }

  getPast(status: string) {
    const params = {to_date: moment.utc().toISOString()};
    return this.getList(status, params);
  }

  getFuture(status: string) {
    const params = {from_date: moment.utc().toISOString()};
    return this.getList(status, params);
  }

  get(id: string) {
    return this.http.get<Appointment>(this.baseUrl + id + '/');
  }

  create(employee, service, start: Moment, notes) {
    return this.http.post<Appointment>(this.baseUrl, {employee, service, start, customer_notes: notes});
  }

  private getList(status: string, params): Observable<Appointment[]> {
    if (status) {
      params.status = status;
    }
    return this.http.get<Appointment[]>(this.baseUrl, {params}).pipe(
      map(adaptList(this.adapter)),
      map(as => as.map(a => {
        a.employee = this.empAdapter.adapt(a.employee);
        return a;
      }))
    );
  }
}
