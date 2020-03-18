import {IWriteModel} from '../../../core/models/interfaces/IWriteModel';
import {MatDialog} from '@angular/material';
import {ComponentType} from '@angular/cdk/portal';
import {CreateDialogComponent} from '../../../core/generics/components/CreateDialogComponent';
import {TemplateRef} from '@angular/core';
import {IReadModel} from '../../../core/models/interfaces/IReadModel';
import {ModelEvent} from '../../events/ModelEvent';
import {ReduxDjangoRWModelService} from '../../../core/generics/services/ReduxDjangoRWModelService';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../../Store';
import {TOGGLE_EDIT} from '../../AdminActions';
import {Observable} from 'rxjs';

export abstract class BaseListComponent<TModel extends IReadModel> {

  @select((store: IAppState) => store.admin.selectedModel) selectedModel$;
  @select((s: IAppState) => s.admin.dashboardState.editMode) editMode$;
  protected DIALOG_WIDTH = '800px';
  abstract modelList$: Observable<IReadModel[]>;


  protected constructor(protected modelService: ReduxDjangoRWModelService<TModel, IWriteModel>,
                        protected dialog: MatDialog,
                        protected componentType: ComponentType<CreateDialogComponent> | TemplateRef<CreateDialogComponent>,
                        protected redux: NgRedux<IAppState>) {
  }

  handleModelEvent(event: ModelEvent) {
    switch (event.action) {
      case 'PATCH':
        this.modelService.patchUpdate(event.model.id, event.model);
        break;
      case 'DELETE':
        this.modelService.delete(event.model.id);
        break;
      case 'CREATE':
        this.modelService.create(event.model);
        break;
    }
  }

  onCreateClicked() {
    const dialogRef = this.dialog.open(this.componentType, {
      width: this.DIALOG_WIDTH,
    });

    dialogRef.afterClosed().toPromise()
      .then(event => {
        if (event) {
          this.handleModelEvent(event);
        }
      });
  }

  toggleEdit() {
    this.redux.dispatch({type: TOGGLE_EDIT});
  }
}
