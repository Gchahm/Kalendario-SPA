import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee, EmployeeAdapter, EmployeeWriteModel} from '../../core/models/Employee';
import {environment} from '../../../environments/environment';
import {ReduxDjangoRWModelService} from '../../core/generics/services/ReduxDjangoRWModelService';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../Store';
import {ToastService} from '../../shared/services/toast.service';
import {UPDATE_EMPLOYEE_PHOTO} from '../AdminActions';

@Injectable({
  providedIn: 'root'
})
export class AdminEmployeeService extends ReduxDjangoRWModelService<Employee, EmployeeWriteModel> {

  constructor(http: HttpClient,
              adapter: EmployeeAdapter,
              toast: ToastService,
              redux: NgRedux<IAppState>) {
    super(http, adapter, environment.apiUrl + 'admin/employees/', redux, toast, 'employee');
  }

  uploadProfilePicture(id: number, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('owner', this.companyId());
    this.http.post<{url}>(this.baseUrl + id + '/photo/', formData)
      .toPromise()
      .then((res) => {
        this.redux.dispatch({type: UPDATE_EMPLOYEE_PHOTO, id, url: res.url});
      })
      .catch((err) => this.toast.error(err));
  }
}
