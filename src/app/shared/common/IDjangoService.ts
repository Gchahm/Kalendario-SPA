import {IReadModel} from '@core/models/interfaces/IReadModel';
import {IWriteModel} from '@core/models/interfaces/IWriteModel';
import {Observable} from 'rxjs';
import {ListResult} from '@admin-schedule/services/AdminModelService';

export interface IDjangoService<R extends IReadModel, W extends IWriteModel> {
  get(params): Observable<ListResult<R>>;
  post(model: W): Observable<R>;
  detail(id: number, params): Observable<R>;
  patch(id, model): Observable<R>;
  delete(id): Observable<R>;
}
