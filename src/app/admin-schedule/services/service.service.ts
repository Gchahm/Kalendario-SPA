import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ServiceAdapter, Service, IServiceWriteModel} from '@core/models/Service';
import {AdminModelService} from './AdminModelService';
import {ToastService} from '@shared/services/toast.service';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '@app/Store';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends AdminModelService<Service, IServiceWriteModel> {

  constructor(http: HttpClient,
              serviceAdapter: ServiceAdapter,
              toast: ToastService,
              redux: NgRedux<IAppState>) {
    super(http, serviceAdapter, environment.apiUrl + 'admin/services/', redux, toast, 'service');
  }
}
