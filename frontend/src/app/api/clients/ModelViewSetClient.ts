import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IReadModel} from '@api/models';
import {IModelViewSetClient} from '@api/clients/IModelViewSetClient';
import {ListResult} from '@api/results/IListResult';
import {Adapter} from '@api/adapter';
import {convertMoment} from '@api/clients/helpers';

export interface Params {
}

export class ModelViewSetClient<M extends IReadModel, P extends Params> implements IModelViewSetClient<M, P> {

    constructor(protected http: HttpClient,
                protected adapter: Adapter<M>,
                protected baseUrl) {
    }

    get(filter: P): Observable<ListResult<M>> {
        const params = convertMoment(filter);
        return this.http.get<ListResult<M>>(this.baseUrl, {params}).pipe(
            map(project => {
                project.results = project.results.map(r => this.adapter.adapt(r));
                return project;
            })
        );
    }

    post(model: any): Observable<M> {
        return this.http.post<M>(this.baseUrl, model).pipe(map(r => this.adapter.adapt(r)));
    }

    detail(id: number, params = {}): Observable<M> {
        return this.http.get<M>(this.baseUrl + id + '/', {params: {...params}}).pipe(map(this.adapter.adapt));
    }

    patch(id, model): Observable<M> {
        return this.http.patch<M>(this.baseUrl + id + '/', model).pipe(map(this.adapter.adapt));
    }

    put(id, model: any): Observable<M> {
        return this.http.put<M>(this.baseUrl + id + '/', model).pipe(map(this.adapter.adapt));
    }

    delete(id): Observable<void> {
        return this.http.delete<void>(this.baseUrl + id + '/');
    }

}
