import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IReadCreateOnlyModelViewSetClient} from '@api/clients/IReadCreateOnlyModelViewSetClient';
import {IReadModel} from '@api/models';
import {Adapter} from '@api/adapter';
import {ListResult} from '@api/results/IListResult';
import {convertMoment} from '@api/clients/helpers';

export class ReadCreateOnlyModelViewSetClient<M extends IReadModel, P> implements IReadCreateOnlyModelViewSetClient<M, P> {

  constructor(protected http: HttpClient,
              private adapter: Adapter<M>,
              protected baseUrl) {
  }

  get(params = {}): Observable<ListResult<M>> {
    convertMoment(params);
    return this.http.get<ListResult<M>>(this.baseUrl, {params: {...convertMoment(params)}})
      .pipe(
        map(project => {
          project.results = project.results.map(r => this.adapter.adapt(r));
          return project;
        })
      );
  }

  detail(id: number, params = {}): Observable<M> {
    return this.http.get<M>(this.baseUrl + id + '/', {params: {...params}}).pipe(map(this.adapter.adapt));
  }

  post(model: any): Observable<M> {
    return this.http.post<M>(this.baseUrl, model).pipe(map(r => this.adapter.adapt(r)));
  }

}
