import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Customer, CustomerAdapter} from '../../core/models/Customer';
import {Observable} from 'rxjs';
import {DjangoRWModelService} from '../../core/generics/services/DjangoRWModelService';
import {IWriteModel} from '../../core/models/interfaces/IWriteModel';
import {ToastService} from '../../shared/services/toast.service';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../Store';
import {AdminModelService} from '../../core/generics/services/AdminModelService';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends AdminModelService<Customer, IWriteModel> {

  constructor(http: HttpClient,
              adapter: CustomerAdapter,
              toast: ToastService,
              redux: NgRedux<IAppState>) {
    super(http, adapter, environment.apiUrl + 'admin/customers/', redux, toast, 'customer');
  }
}

