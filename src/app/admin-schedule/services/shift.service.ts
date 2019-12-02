import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServiceAdapter} from '../../core/models/Service';
import {environment} from '../../../environments/environment';
import {DjangoRWModelService} from '../../core/generics/services/DjangoRWModelService';
import {IShiftReadModel, IShiftWriteModel} from '../../core/models/Shift';

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends DjangoRWModelService<IShiftReadModel, IShiftWriteModel> {

  constructor(http: HttpClient,
              serviceAdapter: ServiceAdapter) {
    super(http, serviceAdapter, environment.apiUrl + 'admin/shifts/');
  }
}
