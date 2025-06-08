import {Injectable} from '@angular/core';
import {ModelViewSetClient} from '@api/clients/ModelViewSetClient';
import {IAppointment, AppointmentAdapter, EmployeeDashboardModel, EmployeeDashboardAdapter} from '@api/models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


export interface EmpDashboardParams {
  fromDate?: string;
  toDate?: string;
  customer?: number;
  services?: number[];
}


@Injectable({
  providedIn: 'root'
})
export class EmployeeDashboardClient extends ModelViewSetClient<IAppointment, EmpDashboardParams> {
  constructor(private empAdapter: EmployeeDashboardAdapter,
              http: HttpClient,
              adapter: AppointmentAdapter) {
    super(http, adapter, environment.apiUrl + 'admin/employeedashboard/');
  }

  employee(): Observable<EmployeeDashboardModel> {
    return this.http.get<EmployeeDashboardModel>(this.baseUrl + 'employee/')
      .pipe(
        map(emp => this.empAdapter.adapt(emp))
      );
  }

}
