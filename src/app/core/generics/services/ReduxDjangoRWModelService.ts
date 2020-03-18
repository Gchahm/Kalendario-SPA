import {HttpClient} from '@angular/common/http';
import {Adapter, adaptList} from '../../interfaces/adapter';
import {map} from 'rxjs/operators';
import {IReadModel} from '../../models/interfaces/IReadModel';
import {IWriteModel} from '../../models/interfaces/IWriteModel';
import {Observable} from 'rxjs';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../../Store';
import {ToastService} from '../../../shared/services/toast.service';
import {Customer} from '../../models/Customer';

export class ReduxDjangoRWModelService<R extends IReadModel, W extends IWriteModel> {

  public actionSufix: string;

  constructor(protected http: HttpClient,
              private adapter: Adapter<R>,
              protected baseUrl,
              protected redux: NgRedux<IAppState>,
              protected toast: ToastService,
              private modelName: string) {
    this.actionSufix = this.modelName.toUpperCase();
  }

  protected companyId() {
    return this.redux.getState().core.user.company.id.toString();
  }

  loadAll(params = {}) {
    this.http.get<ListResult<R>>(this.baseUrl, {params: {...params}})
      .pipe(map(project => {
        project.results = project.results.map(r => this.adapter.adapt(r));
        return project;
      }))
      .toPromise()
      .then((result) => {
        this.redux.dispatch({type: `LOAD_${this.actionSufix}S`, modelList: result.results});
      }).catch(err => {
    });
  }

  create(command: W) {
    this.http.post<R>(this.baseUrl, {...command, owner: this.companyId()})
      .pipe(map(r => this.adapter.adapt(r)))
      .toPromise()
      .then(model => {
        this.toast.success(`${this.modelName} ${model} created`);
        this.redux.dispatch({type: `CREATE_${this.actionSufix}`, model});
      }).catch(err => this.toast.error(err));
  }

  detail(id: number, params = {}): Observable<R> {
    return this.http.get<R>(this.baseUrl + id + '/', {params: {...params}}).pipe(map(this.adapter.adapt));
  }

  patchUpdate(id, command) {
    this.http.patch<R>(this.baseUrl + id + '/', {...command, owner: this.companyId()})
      .pipe(map(this.adapter.adapt))
      .toPromise()
      .then(model => {
        this.toast.success(`${this.modelName} ${model} updated`);
        this.redux.dispatch({type: `UPDATE_${this.actionSufix}`, model});
      }).catch(err => this.toast.error(err));
  }

  put(id, command: W): Observable<R> {
    return this.http.put<R>(this.baseUrl + id + '/', {...command, owner: this.companyId()})
      .pipe(map(this.adapter.adapt));
  }

  delete(id): Observable<R> {
    return this.http.delete<R>(this.baseUrl + id + '/');
  }

}

interface ListResult<R> {
  count: number;
  next: string;
  previous: string;
  results: R[];
}
