import {MatDialog} from '@angular/material';
import {DjangoRWModelService} from '../services/DjangoRWModelService';
import {ToastService} from '../../../shared/services/toast.service';
import {IReadModel} from '../../models/interfaces/IReadModel';
import {HTMLAction, UpdateModelEvent} from './UpdateModelEvent';
import {IWriteModel} from '../../models/interfaces/IWriteModel';
import {ComponentType} from '@angular/cdk/portal';
import {TemplateRef} from '@angular/core';
import {CreateDialogComponent} from './CreateDialogComponent';

export abstract class ListComponent<TModel extends IReadModel> {

  protected constructor(protected modelService: DjangoRWModelService<TModel, IWriteModel>,
                        protected dialog: MatDialog,
                        protected componentType: ComponentType<CreateDialogComponent> | TemplateRef<CreateDialogComponent>,
                        protected toast: ToastService) {
  }

  public modelList: Array<TModel>;
  public selectedModel: TModel;

  abstract dialogData(): object;

  afterPatchEvent(model: TModel) {
    this.modelList = this.modelList.map((m) => m.id === model.id ? model : m);
  }

  afterCreateEvent(model: TModel) {
    this.modelList.push(model);
  }

  afterDeleteEvent(id) {
    this.modelList = this.modelList.filter(m => m.id.toString() !== id);
  }

  handleUpdateModelEvent(event: UpdateModelEvent) {
    switch (event.action) {
      case HTMLAction.patch:
        this.patchModel(event);
        break;
      case HTMLAction.delete:
        this.deleteModel(event);
    }
  }

  patchModel(event: UpdateModelEvent) {
    this.modelService.patch(event.model.id, event.model)
      .toPromise()
      .then((model) => {
        event.onSuccess(model);
        this.afterPatchEvent(model);
        this.toast.success('updated');
      })
      .catch(err => {
        this.toast.error(err);
        event.onFail(err);
      });

  }

  deleteModel(event: UpdateModelEvent) {
    this.modelService.delete(event.model.id)
      .toPromise()
      .then(() => {
        this.afterDeleteEvent(event.model.id);
        this.toast.success('deleted');
      })
      .catch(err => {
        this.toast.error(err);
        event.onFail(err);
      });
  }

  createModel() {
    const dialogRef = this.dialog.open(this.componentType, {
      data: this.dialogData(),
      width: '800px',
    });

    dialogRef.afterClosed().toPromise()
      .then(createModel => {
        if (createModel) {
          this.modelService.post(createModel).toPromise()
            .then((model: TModel) => {
              this.afterCreateEvent(model);
              this.toast.success('created');
            }).catch(error => this.toast.error(error.message));
        }
      });
  }

  loadModels(models: TModel[]) {
    this.modelList = models;
    this.selectedModel = models.find(x => true) as TModel;
  }

  selectModel(id: number) {
    this.selectedModel = this.modelList.find(value => value.id === id);
  }
}
