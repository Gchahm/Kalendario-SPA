import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee, EmployeeAdapter} from '@core/models/Employee';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Slot, SlotAdapter} from '@core/models/Slot';
import {adaptList} from '@core/interfaces/adapter';
import {Moment} from 'moment';
import {Service} from '@core/models/Service';
import {IAppState} from '@app/Store';
import {NgRedux} from '@angular-redux/store';
import {ListResult} from '@admin-schedule/services/AdminModelService';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.apiUrl + 'employees/';

  constructor(private http: HttpClient,
              private slotAdapter: SlotAdapter,
              private adapter: EmployeeAdapter,
              private redux: NgRedux<IAppState>) {
  }

  get(params = {}): Observable<ListResult<Employee>> {
    return this.http.get<ListResult<Employee>>(this.baseUrl,
      {params: {...params, company: this.companyName()}})
      .pipe(map(res => {
        res.results = res.results.map(data => this.adapter.adapt(data));
        return res;
      }));
  }

  detail(id: number, params = {}): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + id + '/',
      {params: {...params, company: this.companyName()}})
      .pipe(map(this.adapter.adapt));
  }

  slots(employeeId: number, service: Service, start: Moment, end: Moment): Observable<Slot[]> {
    const params = {
      service: service.id.toString(),
      start: start.format('YYYY-MM-DDTHH:mm'),
      end: end.format('YYYY-MM-DDTHH:mm')
    };
    return this.http.get<Slot[]>(this.baseUrl + employeeId + '/slots/', {params})
      .pipe(map(adaptList(this.slotAdapter)));
  }

  private companyName() {
    return this.redux.getState().company.companyName;
  }
}
