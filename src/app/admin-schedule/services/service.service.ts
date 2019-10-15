import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ServiceAdapter, ServiceReadModel, ServiceWriteModel} from '../../core/models/Service';
import {DjangoRWModelService} from '../../core/generics/services/DjangoRWModelService';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends DjangoRWModelService<ServiceReadModel, ServiceWriteModel> {

  constructor(http: HttpClient,
              serviceAdapter: ServiceAdapter) {
    super(http, serviceAdapter, environment.apiUrl + 'admin/services/');
  }
}
