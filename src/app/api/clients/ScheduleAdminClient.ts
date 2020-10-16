import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModelViewSetClient} from '@api/clients/ModelViewSetClient';
import {Schedule, ScheduleAdapter} from '@api/models';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleAdminClient extends ModelViewSetClient<Schedule, object> {
  constructor(http: HttpClient,
              adapter: ScheduleAdapter) {
    super(http, adapter, environment.apiUrl + 'admin/schedules/');
  }
}
