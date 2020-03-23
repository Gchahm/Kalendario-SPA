import {IWriteModel} from '../../../core/models/interfaces/IWriteModel';
import {MatDialog} from '@angular/material';
import {ComponentType} from '@angular/cdk/portal';
import {CreateDialogComponent} from '../../../core/generics/components/CreateDialogComponent';
import {TemplateRef} from '@angular/core';
import {IReadModel} from '../../../core/models/interfaces/IReadModel';
import {ModelEvent} from '../../events/ModelEvent';
import {AdminModelService} from '../../../core/generics/services/AdminModelService';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../../Store';
import {TOGGLE_EDIT} from '../../AdminActions';
import {Observable} from 'rxjs';
import {ToastService} from '../../../shared/services/toast.service';

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

  handleModelEvent(event: ModelEvent) {
    switch (event.action) {
      case 'PATCH':
        this.modelService.patchUpdate(event.model.id, event.model).toPromise();
        break;
      case 'DELETE':
        this.modelService.delete(event.model.id).toPromise();
        break;
      case 'CREATE':
        this.modelService.post(event.model).toPromise();
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
