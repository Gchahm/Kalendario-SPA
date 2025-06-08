import {Observable} from 'rxjs';
import {IReadModel} from '@api/models';
import {ApiError} from '@api/Errors';
import {Store} from '@ngrx/store';
import {MatDialogRef} from '@angular/material/dialog';
import {State} from '@admin/state';
import {BaseEntityActions} from '@shared/state/base/actions';
import {BaseEntitySelectors} from '@shared/state/base/selectors';

export class BaseCreateDialog<M extends IReadModel> {

  model$: Observable<M>;
  apiError$: Observable<ApiError>;

  constructor(private dialogRef: MatDialogRef<BaseCreateDialog<M>>,
              private store: Store<State>,
              protected actions: BaseEntityActions<M>,
              selectors: BaseEntitySelectors<M, object>) {
    this.model$ = this.store.select(selectors.getCurrent);
    this.apiError$ = this.store.select(selectors.getApiError);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveModel(entity: M) {
    this.store.dispatch(this.actions.requestCreate({entity}));
  }

  updateModel(entity: M) {
    this.store.dispatch(this.actions.requestUpdate({entity: entity}));
  }
}
