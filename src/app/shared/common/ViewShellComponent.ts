import {BaseContainer} from '@app/containers/BaseContainer';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import {Observable} from 'rxjs';
import {ApiError} from '@api/Errors';
import {IReadModel} from '@api/models';
import {BaseEntityActions} from '@shared/state/base/actions';
import {BaseEntitySelectors} from '@shared/state/base/selectors';

export class ViewShellComponent<M extends IReadModel> extends BaseContainer {

  editMode$: Observable<boolean>;
  selectedModel$: Observable<M>;
  apiError$: Observable<ApiError>;

  constructor(protected store: Store<State>,
              protected actions: BaseEntityActions<M>,
              selectors: BaseEntitySelectors<M, object>) {
    super(store);
    this.selectedModel$ = this.store.select(selectors.getCurrent);
    this.editMode$ = this.store.select(selectors.getEditMode);
    this.apiError$ = this.store.select(selectors.getApiError);
  }

  toggleEdit(value: boolean): void {
    this.store.dispatch(this.actions.toggleEdit({value}));
  }

  cancelForm(value: boolean) {
    if (value) {
      this.store.dispatch(this.actions.select({id: null}));
    }
    this.store.dispatch(this.actions.toggleEdit({value: false}));
  }

  updateModel(model: M) {
    if (!model.id) {
      this.store.dispatch(this.actions.requestCreate({entity: model}));
    } else {
      this.store.dispatch(this.actions.requestUpdate({entity: model}));
    }
  }
}
