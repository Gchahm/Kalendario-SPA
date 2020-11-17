import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DjangoRWModelService} from '@core/generics/services/DjangoRWModelService';
import {Appointment, AppointmentAdapter, IAppointmentWriteModel} from '@api/models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends DjangoRWModelService<Appointment, IAppointmentWriteModel> {

  constructor(http: HttpClient,
              appointmentAdapter: AppointmentAdapter) {
    super(http, appointmentAdapter, environment.apiUrl + 'appointments/');
  }
}
