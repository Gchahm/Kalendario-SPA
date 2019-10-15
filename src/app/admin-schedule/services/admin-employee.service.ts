import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee, EmployeeAdapter, EmployeeWriteModel} from '../../core/models/Employee';
import {map} from 'rxjs/operators';
import {adaptList} from '../../core/interfaces/adapter';
import {environment} from '../../../environments/environment';
import {DjangoRWModelService} from '../../core/generics/services/DjangoRWModelService';

@Injectable({
  providedIn: 'root'
})
export class AdminEmployeeService extends DjangoRWModelService<Employee, EmployeeWriteModel> {

  constructor(http: HttpClient,
              employeeAdapter: EmployeeAdapter) {
    super(http, employeeAdapter, environment.apiUrl + 'admin/employees/');
  }
}
