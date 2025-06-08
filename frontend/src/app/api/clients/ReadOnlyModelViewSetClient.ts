import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IReadModel} from '@api/models';
import {IReadOnlyModelViewSetClient} from '@api/clients/IReadOnlyModelViewSetClient';
import {Adapter} from '@api/adapter';
import {ListResult} from '@api/results/IListResult';
import {convertMoment} from '@api/clients/helpers';

export class ReadOnlyModelViewSetClient<M extends IReadModel, P> implements IReadOnlyModelViewSetClient<M, P> {

  constructor(protected http: HttpClient,
              protected adapter: Adapter<M>,
              protected baseUrl) {
  }


  get(params = {}): Observable<ListResult<M>> {
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
}
