import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Shift, IShiftWriteModel, ShiftAdapter} from '../../core/models/Shift';
import {ReduxDjangoRWModelService} from '../../core/generics/services/ReduxDjangoRWModelService';
import {ToastService} from '../../shared/services/toast.service';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../Store';

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends ReduxDjangoRWModelService<Shift, IShiftWriteModel> {

  constructor(http: HttpClient,
              adapter: ShiftAdapter,
              toast: ToastService,
              redux: NgRedux<IAppState>) {
    super(http, adapter, environment.apiUrl + 'admin/shifts/', redux, toast, 'shift');
  }
}
