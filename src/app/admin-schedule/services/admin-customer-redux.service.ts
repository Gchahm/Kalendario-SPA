import { Injectable } from '@angular/core';
import {ReduxDjangoRWModelService} from '../../core/generics/services/ReduxDjangoRWModelService';
import {HttpClient} from '@angular/common/http';
import {ToastService} from '../../shared/services/toast.service';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../Store';
import {environment} from '../../../environments/environment';
import {Customer, CustomerAdapter, ICustomerWriteModel} from '../../core/models/Customer';

@Injectable({
  providedIn: 'root'
})
export class AdminCustomerReduxService extends ReduxDjangoRWModelService<Customer, ICustomerWriteModel> {

  constructor(http: HttpClient,
              adapter: CustomerAdapter,
              toast: ToastService,
              redux: NgRedux<IAppState>) {
    super(http, adapter, environment.apiUrl + 'admin/customers/', redux, toast, 'customer');
  }
}
