import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {DjangoRWModelService} from '../../core/generics/services/DjangoRWModelService';
import {IShiftReadModel, IShiftWriteModel, ShiftAdapter} from '../../core/models/Shift';

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends DjangoRWModelService<IShiftReadModel, IShiftWriteModel> {

  constructor(http: HttpClient,
              adapter: ShiftAdapter) {
    super(http, adapter, environment.apiUrl + 'admin/shifts/');
  }
}
