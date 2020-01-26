import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee, EmployeeAdapter, EmployeeReadModel} from '../../core/models/Employee';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Slot, SlotAdapter} from '../../core/models/Slot';
import {adaptList} from '../../core/interfaces/adapter';
import {Moment} from 'moment';
import {Service} from '../../core/models/Service';
import {IAppState} from '../../Store';
import {NgRedux} from '@angular-redux/store';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.apiUrl + 'employees/';

  constructor(private http: HttpClient,
              private slotAdapter: SlotAdapter,
              private adapter: EmployeeAdapter,
              private ngRedux: NgRedux<IAppState>) {
  }

  get(params = {}) {
    const state = this.ngRedux.getState();

    return this.http.get<EmployeeReadModel[]>(this.baseUrl,
      {params: {...params, company: state.company.companyName}})
      .pipe(map(adaptList(this.adapter)));
  }

  detail(id: number, params = {}) {
    const state = this.ngRedux.getState();

    return this.http.get<EmployeeReadModel>(this.baseUrl + id + '/',
      {params: {...params, company: state.company.companyName}})
      .pipe(map(this.adapter.adapt));
  }

  current(): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + 'current/').pipe(
      map(this.adapter.adapt)
    );
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
}
