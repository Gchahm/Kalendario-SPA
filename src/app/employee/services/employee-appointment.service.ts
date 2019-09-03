import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import {adaptList} from '../../shared/adapter';
import {environment} from '../../../environments/environment';
import {Appointment, AppointmentAdapter} from '../../shared/models/Appointment';
import {Observable} from 'rxjs';
import {CreateAppointment} from '../models/CreateAppointment';
import {Moment} from 'moment';

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

  getPending(): Observable<Appointment[]> {
    const params = {status: 'P'};
    return this.http.get<Appointment[]>(this.baseUrl, {params}).pipe(
      map(adaptList(this.adapter))
    );
  }

  getAccepted(from, to): Observable<Appointment[]> {
    const params = {from_date: from, to_date: to, status: 'A'};
    return this.http.get<Appointment[]>(this.baseUrl, {params}).pipe(
      map(adaptList(this.adapter))
    );
  }

  create(model: CreateAppointment) {
    return this.http.post<Appointment>(this.baseUrl, model).pipe(map(app => this.adapter.adapt(app)));
  }

  update(appointment: Appointment) {
    const appointmentUpdate = new AppointmentWrite(appointment);
    return this.http.put<AppointmentWrite>(this.baseUrl + appointment.id + '/', appointmentUpdate)
      .pipe(switchMap(a => this.http.get<Appointment>(this.baseUrl + a.id + '/')),
        map(a => this.adapter.adapt(a)));
  }
}

class AppointmentWrite {
  public id: number;
  public customer: number;
  public employee: number;
  public service: number;
  public status: string;
  public start: Moment;

  constructor(appointment: Appointment) {
    this.id = appointment.id;
    this.customer = appointment.customer.id;
    this.employee = appointment.employee.id;
    this.service = appointment.service.id;
    this.status = appointment.status;
    this.start = appointment.start;
  }
}
