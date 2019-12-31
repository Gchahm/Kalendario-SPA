import { Injectable } from '@angular/core';
import {DjangoRWModelService} from '../../core/generics/services/DjangoRWModelService';
import {IScheduleReadModel, IScheduleWriteModel, ScheduleAdapter} from '../../core/models/Schedule';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends DjangoRWModelService<IScheduleReadModel, IScheduleWriteModel> {

  constructor(http: HttpClient,
              adapter: ScheduleAdapter) {
    super(http, adapter, environment.apiUrl + 'admin/schedules/');
  }
}
