import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee, EmployeeAdapter, EmployeeWriteModel} from '../../core/models/Employee';
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

  uploadProfilePicture(id: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<{url}>(this.baseUrl + id + '/photo/', formData);
  }
}
