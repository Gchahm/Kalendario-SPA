import {HttpClient} from '@angular/common/http';
import {Adapter, adaptList} from '../../interfaces/adapter';
import {map} from 'rxjs/operators';
import {IReadModel} from '../../models/interfaces/IReadModel';
import {IWriteModel} from '../../models/interfaces/IWriteModel';
import {Observable} from 'rxjs';
import {IDjangoService} from '../../../shared/common/IDjangoService';
import {ListResult} from './AdminModelService';

export class DjangoRWModelService<R extends IReadModel, W extends IWriteModel> implements IDjangoService<R, W> {

  constructor(protected http: HttpClient,
              private adapter: Adapter<R>,
              protected baseUrl) { }

  get(params = {}): Observable<ListResult<R>> {
    return this.http.get<ListResult<R>>(this.baseUrl, {params: {...params}})
      .pipe(
        map(project => {
          project.results = project.results.map(r => this.adapter.adapt(r));
          return project;
        })
      );
  }

  post(model: W): Observable<R> {
    return this.http.post<R>(this.baseUrl, model).pipe(map(r => this.adapter.adapt(r)));
  }

  detail(id: number, params = {}): Observable<R> {
    return this.http.get<R>(this.baseUrl + id + '/', {params: {...params}}).pipe(map(this.adapter.adapt));
  }

  patch(id, model): Observable<R> {
    return this.http.patch<R>(this.baseUrl + id + '/', model).pipe(map(this.adapter.adapt));
  }

  put(id, model: W): Observable<R> {
    return this.http.put<R>(this.baseUrl + id + '/', model).pipe(map(this.adapter.adapt));
  }

  delete(id): Observable<R> {
    return this.http.delete<R>(this.baseUrl + id + '/');
  }

}
