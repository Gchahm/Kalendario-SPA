import {Observable, of} from 'rxjs';
import * as moment from 'moment';
import {ReadModelStub} from '@api/testing';
import {ListResult} from '@api/results/IListResult';
import {Employee, Service, Slot} from '@api/models';
import {Moment} from 'moment';

const READ_MODEL = new ReadModelStub();


export class DjangoRWModelServiceMock {
  get(params): Observable<ListResult<ReadModelStub>> {
    return of({count: 1, next: '', previous: '', results: [READ_MODEL]});
  }

  post(model: any) {
  }

  detail(id: number, params): Observable<ReadModelStub> {
    return of(READ_MODEL);
  }

  patch(id, model): Observable<ReadModelStub> {
    return of(READ_MODEL);
  }

  delete(id): Observable<ReadModelStub>{
    return of(READ_MODEL);
  }

}

export class EmployeeServiceMock {

  get(params = {}): Observable<ListResult<Employee>> {
    return of({count: 0, next: '', previous: '', results: [new Employee()]});
  }

  detail(id: number, params = {}): Observable<Employee> {
    return of(new Employee());
  }

  slots(employeeId: number, service: Service, start: Moment, end: Moment): Observable<Slot[]> {
    return of([new Slot(moment.utc(), moment.utc())]);
  }
}
