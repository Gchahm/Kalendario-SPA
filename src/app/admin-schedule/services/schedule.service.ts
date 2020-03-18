import { Injectable } from '@angular/core';
import {Schedule, IScheduleWriteModel, ScheduleAdapter} from '../../core/models/Schedule';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ReduxDjangoRWModelService} from '../../core/generics/services/ReduxDjangoRWModelService';
import {ToastService} from '../../shared/services/toast.service';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../Store';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends ReduxDjangoRWModelService<Schedule, IScheduleWriteModel> {

  constructor(http: HttpClient,
              adapter: ScheduleAdapter,
              toast: ToastService,
              redux: NgRedux<IAppState>) {
    super(http, adapter, environment.apiUrl + 'admin/schedules/', redux, toast, 'schedule');
  }
}
