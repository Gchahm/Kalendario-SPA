import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Appointment, AppointmentAdapter, CreateAppointmentModel, UpdateAppointmentModel} from '../models/Appointment';
import {EmployeeAdapter} from '../models/Employee';
import {forkJoin, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {adaptList} from '../adapter';
import {BaseAppointment} from '../models/BaseAppointment';
import {SelfAppointment, SelfAppointmentAdapter} from '../../employee/models/SelfAppointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointmentBaseUrl = environment.apiUrl + 'appointments/';
  private selfAppointmentBaseUrl = environment.apiUrl + 'self-appointments/';

  constructor(private http: HttpClient,
              private appointmentAdapter: AppointmentAdapter,
              private selfAppointmentAdapter: SelfAppointmentAdapter,
              private empAdapter: EmployeeAdapter) {
  }

  getAll(params: AppointmentQParams): Observable<BaseAppointment[]> {
    return forkJoin(
      this.getSelfAppointments(params),
      this.getAppointments(params),
    ).pipe(
      map(([o1, o2], index) => [].concat(o1).concat(o2))
    );
  }

  getAppointments(params: AppointmentQParams): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.appointmentBaseUrl, {params: {...params}}).pipe(
      map(adaptList(this.appointmentAdapter)),
      map(as => as.map(a => {
        a.employee = this.empAdapter.adapt(a.employee);
        return a;
      }))
    );
  }

  getAppointment(id: string) {
    return this.http.get<Appointment>(this.appointmentBaseUrl + id + '/').pipe(map(a => this.appointmentAdapter.adapt(a)));
  }

  createAppointment(model: CreateAppointmentModel) {
    return this.http.post<Appointment>(this.appointmentBaseUrl, model).pipe(map(a => this.appointmentAdapter.adapt(a)));
  }

  updateAppointment(appointment: Appointment) {
    return this.http.put<UpdateAppointmentModel>(this.appointmentBaseUrl + appointment.id + '/', appointment.updateModel())
      .pipe(
        map(a => this.appointmentAdapter.adapt(a))
      );
  }

  getSelfAppointments(params: AppointmentQParams): Observable<SelfAppointment[]> {
    return this.http.get<SelfAppointment[]>(this.selfAppointmentBaseUrl, {params: {...params}}).pipe(
      map(adaptList(this.selfAppointmentAdapter)),
      map(as => as.map(a => {
        a.employee = this.empAdapter.adapt(a.employee);
        return a;
      }))
    );
  }

  getSelfAppointment(id: string) {
    return this.http.get<SelfAppointment>(this.appointmentBaseUrl + id + '/').pipe(map(a => this.selfAppointmentAdapter.adapt(a)));
  }

  createSelfAppointment(model: CreateSelfAppointmentModel) {
    return this.http.post<SelfAppointment>(this.selfAppointmentBaseUrl, model).pipe(map(a => this.selfAppointmentAdapter.adapt(a)));
  }
}

export interface CreateSelfAppointmentModel {
  start: string;
  end: string;
  reason: string;
  employee: string;
}

export interface AppointmentQParams {
  employee?: string;
  customer?: string;
  status?: string;
  from_date?: string;
  to_date?: string;
}
