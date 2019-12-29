import { Injectable } from '@angular/core';
import {DjangoRWModelService} from '../../core/generics/services/DjangoRWModelService';
import {ISelfAppointmentReadModel, ISelfAppointmentWriteModel, SelfAppointmentAdapter} from '../../admin-schedule/models/SelfAppointment';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SelfAppointmentService extends DjangoRWModelService<ISelfAppointmentReadModel, ISelfAppointmentWriteModel> {

  constructor(http: HttpClient,
              private appointmentAdapter: SelfAppointmentAdapter) {
    super(http, appointmentAdapter, environment.apiUrl + 'self-appointments/');
  }

}
