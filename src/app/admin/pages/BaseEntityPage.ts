import {BaseContainer} from '@app/containers/BaseContainer';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import {Observable} from 'rxjs';
import {ApiError} from '@api/Errors';
import {IReadModel} from '@api/models';
import {BaseEntityActions} from '@shared/state/base/actions';
import {BaseEntitySelectors} from '@shared/state/base/selectors';
import {Params} from '@api/clients/ModelViewSetClient';

export class BaseEntityPage<M extends IReadModel> extends BaseContainer {

  editMode$: Observable<boolean>;
  initialized$: Observable<boolean>;
  modelList$: Observable<M[]>;
  selectedModel$: Observable<M>;
  apiError$: Observable<ApiError>;
  searchValue$: Observable<string>;

  constructor(protected store: Store<State>,
              protected actions: BaseEntityActions<M>,
              selectors: BaseEntitySelectors<M, object>,
              params: Params = {}) {
    super(store);
    this.store.dispatch(actions.initializeStore({params}));

    this.modelList$ = this.store.select(selectors.getFilteredEntities);
    this.selectedModel$ = this.store.select(selectors.getCurrent);
    this.editMode$ = this.store.select(selectors.getEditMode);
    this.initialized$ = this.store.select(selectors.getIsInitialized);
    this.apiError$ = this.store.select(selectors.getApiError);
    this.searchValue$ = this.store.select(selectors.getSearchValue);
  }

  modelSelected(model: M): void {
    this.store.dispatch(this.actions.select({id: model.id}));
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

  newModel() {
    this.store.dispatch(this.actions.initializeCreate({}));
  }

  saveModel(model: M) {
    this.store.dispatch(this.actions.requestCreate({entity: model}));
  }

  updateModel(model: M) {
    this.store.dispatch(this.actions.requestUpdate({entity: model}));
  }

  deleteModel(model: IReadModel) {
    this.store.dispatch(this.actions.requestDelete({id: model.id}));
  }

  updateSearch(value: string) {
    this.store.dispatch(this.actions.setSearch({value}));
  }

}
