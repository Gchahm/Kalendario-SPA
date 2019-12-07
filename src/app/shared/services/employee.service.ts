import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee, EmployeeAdapter} from '../../core/models/Employee';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Slot, SlotAdapter} from '../../customer/models/Slot';
import {adaptList} from '../../core/interfaces/adapter';
import {Moment} from 'moment';
import {Service, ServiceAdapter} from '../../core/models/Service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = environment.apiUrl + 'employees/';

  constructor(private http: HttpClient,
              private slotAdapter: SlotAdapter,
              private employeeAdapter: EmployeeAdapter,
              private serviceAdapter: ServiceAdapter) {
  }

  getAll() {
    return this.http.get<Employee[]>(this.baseUrl).pipe(map(adaptList(this.employeeAdapter)));
  }

  get(id: string) {
    return this.http.get<Employee>(this.baseUrl + id + '/').pipe(
      map(this.employeeAdapter.adapt),
      map(emp => {
        emp.services = emp.services.map(this.serviceAdapter.adapt);
        return emp;
      })
    );
  }

  current(): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + 'current/').pipe(
      map(this.employeeAdapter.adapt)
    );
  }

  slots(employee: Employee, service: Service, start: Moment, end: Moment): Observable<Slot[]> {
    const params = {service: service.id.toString(), start: start.format('YYYY-MM-DDTHH:mm'), end: end.format('YYYY-MM-DDTHH:mm')};
    return this.http.get<Slot[]>(this.baseUrl + employee.id + '/slots/', {params}).pipe(
      map(adaptList(this.slotAdapter))
    );
  }
}
