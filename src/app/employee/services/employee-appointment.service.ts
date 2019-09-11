import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {concatAll, flatMap, map, mergeAll, switchMap} from 'rxjs/operators';
import {adaptList} from '../../shared/adapter';
import {environment} from '../../../environments/environment';
import {Appointment, AppointmentAdapter} from '../../shared/models/Appointment';
import {combineLatest, concat, forkJoin, merge, Observable} from 'rxjs';
import {CreateAppointmentModel} from '../models/CreateAppointment';
import {CreateSelfAppointmentModel} from '../models/CreateSelfAppointment';
import {SelfAppointment, SelfAppointmentAdapter} from '../models/SelfAppointment';
import {Moment} from 'moment';
import {BaseAppointment} from '../../shared/models/BaseAppointment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAppointmentService {

  private appointmentBaseUrl = environment.apiUrl + 'admin/appointments/';
  private selfAppointmentBaseUrl = environment.apiUrl + 'admin/self-appointments/';

  constructor(private http: HttpClient,
              private appointmentAdapter: AppointmentAdapter,
              private selfAppointmentAdapter: SelfAppointmentAdapter) {
  }

  getPending(empId): Observable<BaseAppointment[]> {
    const params = {status: 'P'};
    return this.filteredAppointments(params);
  }

  getAccepted(empId, from, to): Observable<BaseAppointment[]> {
    const params = {from_date: from, to_date: to, status: 'A', employee: empId};
    return this.getList(params);
  }

  createAppointment(model: CreateAppointmentModel) {
    return this.http.post<Appointment>(this.appointmentBaseUrl, model).pipe(map(app => this.appointmentAdapter.adapt(app)));
  }

  createSelfAppointment(model: CreateSelfAppointmentModel) {
    return this.http.post<Appointment>(this.selfAppointmentBaseUrl, model).pipe(map(app => this.selfAppointmentAdapter.adapt(app)));
  }

  update(appointment: Appointment) {
    const appointmentUpdate = new AppointmentWrite(appointment);
    return this.http.put<AppointmentWrite>(this.appointmentBaseUrl + appointment.id + '/', appointmentUpdate)
      .pipe(switchMap(a => this.http.get<Appointment>(this.appointmentBaseUrl + a.id + '/')),
        map(a => this.appointmentAdapter.adapt(a)));
  }

  private getList(params): Observable<BaseAppointment[]> {
    return forkJoin(
      this.filteredSelfAppointments(params),
      this.filteredAppointments(params),
    ).pipe(
      map(([o1, o2], index) => [].concat(o1).concat(o2))
    );
  }

  private filteredAppointments(params): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.appointmentBaseUrl, {params}).pipe(
      map(adaptList(this.appointmentAdapter))
    );
  }

  private filteredSelfAppointments(params): Observable<SelfAppointment[]> {
    return this.http.get<SelfAppointment[]>(this.selfAppointmentBaseUrl, {params}).pipe(
      map(adaptList(this.selfAppointmentAdapter))
    );
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
