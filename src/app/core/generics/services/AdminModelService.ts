import {HttpClient} from '@angular/common/http';
import {Adapter} from '../../interfaces/adapter';
import {catchError, map} from 'rxjs/operators';
import {IReadModel} from '../../models/interfaces/IReadModel';
import {IWriteModel} from '../../models/interfaces/IWriteModel';
import {Observable, throwError} from 'rxjs';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../../Store';
import {ToastService} from '../../../shared/services/toast.service';
import {IDjangoService} from '../../../shared/common/IDjangoService';

export class AdminModelService<R extends IReadModel, W extends IWriteModel> implements IDjangoService<R, W> {

  public actionSufix: string;

  constructor(protected http: HttpClient,
              private adapter: Adapter<R>,
              protected baseUrl,
              protected redux: NgRedux<IAppState>,
              protected toast: ToastService,
              private modelName: string) {
    this.actionSufix = this.modelName.toUpperCase();
  }

  protected companyId(): number {
    return this.redux.getState().core.user.company.id;
  }

  get(params = {}): Observable<ListResult<R>> {
    return this.http.get<ListResult<R>>(this.baseUrl, {params: {...params}})
      .pipe(
        map(project => {
          project.results = project.results.map(r => this.adapter.adapt(r));
          this.redux.dispatch({type: `LOAD_${this.actionSufix}S`, modelList: project.results});
          return project;
        }));
  }

  post(command: W): Observable<R> {
    return this.http.post<R>(this.baseUrl, {...command, owner: this.companyId()})
      .pipe(
        map(r => {
          const model = this.adapter.adapt(r);
          this.toast.success(`${this.modelName} ${model} created`);
          this.redux.dispatch({type: `CREATE_${this.actionSufix}`, model});
          return model;
        }),
        catchError((err, caught) => {
          this.toast.error(err);
          return throwError(err);
        }));
  }

  detail(id: number, params = {}): Observable<R> {
    return this.http.get<R>(this.baseUrl + id + '/', {params: {...params}})
      .pipe(
        map(this.adapter.adapt)
      );
  }

  patch(id, command): Observable<R> {
    return this.http.patch<R>(this.baseUrl + id + '/', {...command, owner: this.companyId()})
      .pipe(
        map((value => {
          const model: R = this.adapter.adapt(value);
          this.toast.success(`${this.modelName} ${model} updated`);
          this.redux.dispatch({type: `UPDATE_${this.actionSufix}`, model});
          return model;
        })),
        catchError((err, caught) => {
          this.toast.error(err);
          return throwError(err);
        }));
  }

  //
  // put(id, command: W): Observable<R> {
  //   return this.http.put<R>(this.baseUrl + id + '/', {...command, owner: this.companyId()})
  //     .pipe(map(this.adapter.adapt));
  // }

  delete(id): Observable<any> {
    return this.http.delete(this.baseUrl + id + '/')
      .pipe(
        map(() => {
          this.toast.success(`${this.modelName} deleted`);
          this.redux.dispatch({type: `DELETE_${this.actionSufix}`, id: id});
        }),
        catchError((err, caught) => {
          this.toast.error(err);
          return err;
        }));
  }
}

export interface ListResult<R> {
  count: number;
  next: string;
  previous: string;
  results: R[];
}
