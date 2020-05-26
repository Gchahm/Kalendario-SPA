import {IWriteModel} from '@core/models/interfaces/IWriteModel';
import {ComponentType} from '@angular/cdk/portal';
import {CreateDialogComponent} from '@core/generics/components/CreateDialogComponent';
import {TemplateRef} from '@angular/core';
import {IReadModel} from '@core/models/interfaces/IReadModel';
import {AdminModelService} from '../../services/AdminModelService';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '@app/Store';
import {TOGGLE_EDIT} from '../../AdminActions';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

export abstract class BaseListComponent<TModel extends IReadModel> {

  @select((store: IAppState) => store.admin.selectedModel) selectedModel$;
  @select((s: IAppState) => s.admin.dashboardState.editMode) editMode$;
  protected DIALOG_WIDTH = '800px';
  abstract modelList$: Observable<IReadModel[]>;


  protected constructor(protected modelService: AdminModelService<TModel, IWriteModel>,
                        protected dialog: MatDialog,
                        protected componentType: ComponentType<CreateDialogComponent> | TemplateRef<CreateDialogComponent>,
                        protected redux: NgRedux<IAppState>) {
  }

  openCreateDialog() {
    this.dialog.open(this.componentType, {
      width: this.DIALOG_WIDTH,
    });
  }

  deleteModel(model: TModel) {
    this.modelService.delete(model.id).toPromise();
  }

  toggleEdit() {
    this.redux.dispatch({type: TOGGLE_EDIT});
  }
}
