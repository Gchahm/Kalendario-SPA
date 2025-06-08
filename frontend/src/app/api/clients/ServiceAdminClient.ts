import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModelViewSetClient} from '@api/clients/ModelViewSetClient';
import {Service, ServiceAdapter} from '@api/models';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceAdminClient extends ModelViewSetClient<Service, object> {
  constructor(http: HttpClient,
              adapter: ServiceAdapter) {
    super(http, adapter, environment.apiUrl + 'admin/services/');
  }
}
