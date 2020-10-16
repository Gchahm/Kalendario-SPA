import {Observable} from 'rxjs';
import {IReadModel} from '@api/models';
import {ListResult} from '@api/results/IListResult';

export interface IModelViewSetClient<M extends IReadModel, P> {
  get(params: P): Observable<ListResult<M>>;

  post(model: any): Observable<M>;

  detail(id: number, params): Observable<M>;

  patch(id, model): Observable<M>;

  delete(id): Observable<void>;
}
