import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModelViewSetClient} from '@api/clients/ModelViewSetClient';
import {SchedulingPanel, SchedulingPanelAdapter} from '@api/models';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchedulingPanelAdminClient extends ModelViewSetClient<SchedulingPanel, object> {
  constructor(http: HttpClient,
              adapter: SchedulingPanelAdapter) {
    super(http, adapter, environment.apiUrl + 'admin/panels/');
  }
}
