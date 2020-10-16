import {Moment} from 'moment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Appointment, AppointmentAdapter} from '@api/models';
import {ModelViewSetClient} from '@api/clients/ModelViewSetClient';
import {ListResult} from '@api/results/IListResult';
import {environment} from '../../../environments/environment';

export interface AdminAppointmentParams {
  fromDate?: Moment;
  toDate?: Moment;
  customer?: number;
  employee?: number;
  employees?: number[];
  services?: number[];
}


@Injectable({
  providedIn: 'root'
})
export class AppointmentAdminClient extends ModelViewSetClient<Appointment, AdminAppointmentParams> {
  constructor(http: HttpClient,
              adapter: AppointmentAdapter) {
    super(http, adapter, environment.apiUrl + 'admin/appointments/');
  }

  history(id: number): Observable<ListResult<Appointment>> {
    return this.http.get<ListResult<Appointment>>(this.baseUrl + `${id}/history/`)
      .pipe(
        map(project => {
          project.results = project.results.map(r => this.adapter.adapt(r));
          return project;
        })
      );
  }

  createLock(model: any): Observable<Appointment> {
    return this.http.post<Appointment>(this.baseUrl + 'lock/', model).pipe(map(r => this.adapter.adapt(r)));
  }

  updateLock(id, model): Observable<Appointment> {
    return this.http.patch<Appointment>(this.baseUrl + `${id}/plock/`, model).pipe(map(this.adapter.adapt));
  }
}
