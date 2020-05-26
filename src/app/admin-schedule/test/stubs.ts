import {Observable, of} from 'rxjs';
import {ListResult} from '../services/AdminModelService';
import {IWriteModel} from '@core/models/interfaces/IWriteModel';
import {ReadModelStub} from '@shared/test/stubs';

const READ_MODEL = new ReadModelStub();

export class TestAdapter {
  adapt(item: any) {
    return READ_MODEL;
  }
}

export class AdminServiceMock {
  get(params): Observable<ListResult<ReadModelStub>> {
    return of({count: 1, next: '', previous: '', results: [READ_MODEL]});
  }

  post(model: IWriteModel) {
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
