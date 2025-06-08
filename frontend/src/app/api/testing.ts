import {Observable, of} from 'rxjs';
import {ListResult} from '@api/results/IListResult';
import {IReadModel} from '@api/models';

export class ReadModelStub implements IReadModel {
  id: number;
  name: string;

  writeModel() {
    return undefined;
  }

}

const READ_MODEL = new ReadModelStub();

export class TestAdapter {
  adapt(item: any) {
    return READ_MODEL;
  }
}

export class ModelViewSetClientMock{
  get(params): Observable<ListResult<ReadModelStub>> {
    return of({count: 1, next: '', previous: '', results: [READ_MODEL]});
  }

  post(model) {
  }

  detail(id: number, params): Observable<ReadModelStub> {
    return of(READ_MODEL);
  }

  patch(id, model): Observable<ReadModelStub> {
    return of(READ_MODEL);
  }

  delete(id): Observable<ReadModelStub> {
    return of(READ_MODEL);
  }
}


export class ReadOnlyModelViewSetClientMock {
  get(params): Observable<ListResult<ReadModelStub>> {
    return of({count: 1, next: '', previous: '', results: [READ_MODEL]});
  }

  detail(id: number, params): Observable<ReadModelStub> {
    return of(READ_MODEL);
  }
}
