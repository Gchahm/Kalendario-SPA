import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {adaptList} from '../../shared/adapter';
import {environment} from '../../../environments/environment';
import {Appointment, AppointmentAdapter} from '../../shared/models/Appointment';
import {Observable} from 'rxjs';
import {CreateAppointment} from '../models/CreateAppointment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAppointmentService {

  private baseUrl = environment.apiUrl + 'employee/appointments/';

  constructor(private http: HttpClient,
              private adapter: AppointmentAdapter) {
  }

  getList(from, to): Observable<Appointment[]> {
    const params = {from_date: from, to_date: to};
    return this.http.get<Appointment[]>(this.baseUrl, {params}).pipe(
      map(adaptList(this.adapter))
    );
  }

  create(model: CreateAppointment) {
    return this.http.post<Appointment>(this.baseUrl, model).pipe(map(appointment => this.adapter.adapt(appointment)));
  }
}
