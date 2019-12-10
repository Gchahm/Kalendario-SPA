import {HttpClient} from '@angular/common/http';
import {Adapter, adaptList} from '../../interfaces/adapter';
import {map} from 'rxjs/operators';
import {IReadModel} from '../../models/interfaces/IReadModel';
import {IWriteModel} from '../../models/interfaces/IWriteModel';

export class DjangoRWModelService<R extends IReadModel, M extends IWriteModel> {

  constructor(protected http: HttpClient,
              private adapter: Adapter<R>,
              protected baseUrl) { }

  get() {
    return this.http.get<R[]>(this.baseUrl).pipe(map(adaptList(this.adapter)));
  }

  post(model: M) {
    return this.http.post<R>(this.baseUrl, model).pipe(map(this.adapter.adapt));
  }

  detail(id: number) {
    return this.http.get<R>(this.baseUrl + id + '/').pipe(map(this.adapter.adapt));
  }

  patch(id, model: M) {
    return this.http.patch<R>(this.baseUrl + id + '/', model).pipe(map(this.adapter.adapt));
  }

  put(id, model: M) {
    return this.http.put<R>(this.baseUrl + id + '/', model).pipe(map(this.adapter.adapt));
  }
}
