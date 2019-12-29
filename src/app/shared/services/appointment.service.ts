import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DjangoRWModelService} from '../../core/generics/services/DjangoRWModelService';
import {AppointmentAdapter, IAppointmentReadModel, IAppointmentWriteModel} from '../../core/models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends DjangoRWModelService<IAppointmentReadModel, IAppointmentWriteModel> {

  constructor(http: HttpClient,
              private appointmentAdapter: AppointmentAdapter) {
    super(http, appointmentAdapter, environment.apiUrl + 'appointments/');
  }
}
