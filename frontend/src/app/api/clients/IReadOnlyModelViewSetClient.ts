import {Observable} from 'rxjs';
import {IReadModel} from '@api/models';
import {ListResult} from '@api/results/IListResult';

export interface IReadOnlyModelViewSetClient<R extends IReadModel, P> {
  get(params: P): Observable<ListResult<R>>;

  detail(id: number, params): Observable<R>;
}
