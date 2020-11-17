import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {IReadModel} from '@api/models';
import {ModelViewSetClient, Params} from '@api/clients/ModelViewSetClient';
import {BaseEntityActions} from '@shared/state/base/actions';
import {BaseEntityState} from '@shared/state/base/state';
import {BaseEntitySelectors} from '@shared/state/base/selectors';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

export class BaseEffects<T extends IReadModel> {

  constructor(protected actions$: Actions,
              protected client: ModelViewSetClient<T, Params>,
              protected actions: BaseEntityActions<T>,
              protected selectors: BaseEntitySelectors<T, BaseEntityState<T>>,
              protected store: Store<BaseEntityState<T>>) {
  }

  requestEntities$ = createEffect(() => this.actions$.pipe(
    ofType(this.actions.requestEntities),
    switchMap(action => this.client.get(action.params).pipe(
      map(result => (this.actions.setAll({entities: result.results}))),
      catchError(error => of(this.actions.setError({error})))
      )
    )
  ));

  // TODO: What happens in an error here?
  requestEntity$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(this.actions.requestEntity),
    mergeMap(action => this.client.detail(action.id).pipe(
      map(result => (this.actions.upsertOne({entity: result}))),
      catchError(error => of(this.actions.setError({error})))
      )
    )
    ));

  requestUpdate$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(this.actions.requestUpdate),
    map((action) => action.entity),
    mergeMap((entity: T) => this.client.patch(entity.id, entity).pipe(
      tap(u => this.afterSuccess()),
      map(updated => this.actions.upsertOne({entity: updated})),
      catchError(error => of(this.actions.setError({error})))
      )
    )
  ));

  requestCreate$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(this.actions.requestCreate),
    map((action) => action.entity),
    mergeMap((entity: T) => this.client.post(entity).pipe(
      tap(u => this.afterSuccess()),
      map(created =>  this.actions.addOne({entity: created})),
      catchError(error => of(this.actions.setError({error})))
      )
    )
  ));

  requestDelete$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(this.actions.requestDelete),
    map((action) => action.id),
    mergeMap((employeeId: number) => this.client.delete(employeeId).pipe(
      map(() => (this.actions.removeOne({id: employeeId}))),
      catchError(error => of(this.actions.setError({error})))
      )
    )
  ));

  initializeStore$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(this.actions.initializeStore),
    map((action) => action.params),
    withLatestFrom(this.store.select(this.selectors.getIsInitialized)),
    map(([params, initialized]) => initialized ? this.actions.alreadyInitialized({}) : this.actions.requestEntities({params}))
  ));

  afterSuccess() {}
}


export class BaseEffectsWithDialog<T extends IReadModel> extends BaseEffects<T> {

  dialogRef: MatDialogRef<object>;

  constructor(actions$: Actions,
              client: ModelViewSetClient<T, Params>,
              actions: BaseEntityActions<T>,
              selectors: BaseEntitySelectors<T, BaseEntityState<T>>,
              store: Store<BaseEntityState<T>>,
              protected dialog: MatDialog,
              private dialogClass) {
    super(actions$, client, actions, selectors, store);
  }

  OpenCreateDialog$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(this.actions.openFormDialog),
    map((action) => action.id),
    map(id => {
      this.dialogRef = this.dialog.open(this.dialogClass, {width: '44rem'});
      return this.actions.select({id});
    })
  ));

  afterSuccess() {
    if (!!this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
