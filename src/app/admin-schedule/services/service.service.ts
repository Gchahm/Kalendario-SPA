import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ServiceAdapter, Service, ServiceWriteModel} from '../../core/models/Service';
import {ReduxDjangoRWModelService} from '../../core/generics/services/ReduxDjangoRWModelService';
import {ToastService} from '../../shared/services/toast.service';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../Store';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends ReduxDjangoRWModelService<Service, ServiceWriteModel> {

  constructor(http: HttpClient,
              serviceAdapter: ServiceAdapter,
              toast: ToastService,
              redux: NgRedux<IAppState>) {
    super(http, serviceAdapter, environment.apiUrl + 'admin/services/', redux, toast, 'service');
  }
}
