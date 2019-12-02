import {MatDialog} from '@angular/material';
import {DjangoRWModelService} from '../services/DjangoRWModelService';
import {ToastService} from '../../../shared/services/toast.service';
import {IReadModel} from '../../models/interfaces/IReadModel';
import {UpdateModelEvent} from './UpdateModelEvent';
import {IWriteModel} from '../../models/interfaces/IWriteModel';
import {ComponentType} from '@angular/cdk/portal';
import {Component, OnDestroy, TemplateRef} from '@angular/core';
import {CreateDialogComponent} from './CreateDialogComponent';
import {Subscription} from 'rxjs';

export abstract class ListComponent<TModel extends IReadModel> implements OnDestroy {

  protected constructor(private modelService: DjangoRWModelService<IReadModel, IWriteModel>,
                        private dialog: MatDialog,
                        private componentType: ComponentType<CreateDialogComponent> | TemplateRef<CreateDialogComponent>,
                        private toast: ToastService) {
  }

  subscription: Subscription;
  public modelList: TModel[];
  public selectedModel: TModel;
  abstract dialogData(): object;

  updateModel(event: UpdateModelEvent) {
    this.modelService.patch(event.model.id, event.model)
      .toPromise()
      .then((model: TModel) => {
        event.onSuccess(model);
        this.modelList = this.modelList.map((m) => m.id === model.id ? model : m);
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
              this.modelList.push(model);
              this.toast.success('created');
            }).catch(error => this.toast.error(error.message));
        }
      });
  }

  loadModels(models: TModel[]) {
    this.modelList = models;
    this.selectedModel = models[0];
  }

  selectModel(id: number) {
    this.selectedModel = this.modelList.find(m => m.id === id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
