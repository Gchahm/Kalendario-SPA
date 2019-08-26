import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee, EmployeeAdapter} from '../models/Employee';
import {environment} from '../../../environments/environment';
import {concatMap, flatMap, map, mergeMap} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import {InstagramProfile} from '../../staff-services/models/InstagramProfile';
import {Slot, SlotAdapter} from '../../staff-services/models/Slot';
import {adaptList} from '../adapter';
import {Moment} from 'moment';
import {Service} from '../models/Service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = environment.apiUrl + 'employees/';

  constructor(private http: HttpClient,
              private slotAdapter: SlotAdapter,
              private employeeAdapter: EmployeeAdapter) {
  }

  getAll() {
    return this.http.get<Employee[]>(this.baseUrl).pipe(map(adaptList(this.employeeAdapter)));
  }

  get(id: string) {
    return this.http.get<Employee>(this.baseUrl + id + '/').pipe(map(this.employeeAdapter.adapt));
  }

  current(): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + 'current/');
  }

  slots(employee: Employee, service: Service, date: Moment) {
    const params = { service: service.id.toString(), date: date.format('YYYY-MM-DD') };
    return this.http.get<Slot[]>(this.baseUrl + employee.id + '/slots/', {params}).pipe(
      map(adaptList(this.slotAdapter))
    );
  }
}
