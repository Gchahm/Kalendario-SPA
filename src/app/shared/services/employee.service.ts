import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee, EmployeeAdapter, EmployeeReadModel, EmployeeWriteModel} from '../../core/models/Employee';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Slot, SlotAdapter} from '../../customer/models/Slot';
import {adaptList} from '../../core/interfaces/adapter';
import {Moment} from 'moment';
import {Service, ServiceAdapter} from '../../core/models/Service';
import {DjangoRWModelService} from '../../core/generics/services/DjangoRWModelService';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends DjangoRWModelService<EmployeeReadModel, EmployeeWriteModel> {


  constructor(http: HttpClient,
              private slotAdapter: SlotAdapter,
              private employeeAdapter: EmployeeAdapter) {
    super(http, employeeAdapter, environment.apiUrl + 'employees/');
  }

  current(): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + 'current/').pipe(
      map(this.employeeAdapter.adapt)
    );
  }

  slots(employee: EmployeeReadModel, service: Service, start: Moment, end: Moment): Observable<Slot[]> {
    const params = {service: service.id.toString(), start: start.format('YYYY-MM-DDTHH:mm'), end: end.format('YYYY-MM-DDTHH:mm')};
    return this.http.get<Slot[]>(this.baseUrl + employee.id + '/slots/', {params}).pipe(
      map(adaptList(this.slotAdapter))
    );
  }
}
