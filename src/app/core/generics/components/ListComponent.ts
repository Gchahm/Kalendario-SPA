import {MatDialog} from '@angular/material';
import {DjangoRWModelService} from '../services/DjangoRWModelService';
import {ToastService} from '../../../shared/services/toast.service';
import {IReadModel} from '../../models/interfaces/IReadModel';
import {UpdateModelEvent} from './UpdateModelEvent';
import {IWriteModel} from '../../models/interfaces/IWriteModel';
import {ComponentType} from '@angular/cdk/portal';
import {Component, TemplateRef} from '@angular/core';
import {CreateDialogComponent} from './CreateDialogComponent';

export abstract class ListComponent {

  protected constructor(private modelService: DjangoRWModelService<IReadModel, IWriteModel>,
                        private dialog: MatDialog,
                        private componentType: ComponentType<CreateDialogComponent> | TemplateRef<CreateDialogComponent>,
                        private toast: ToastService) {
  }

  abstract onModelCreate(response);
  abstract dialogData(): object;

  updateModel(event: UpdateModelEvent) {
    this.modelService.patch(event.model.id, event.model)
      .toPromise()
      .then(model => event.onSuccess(model))
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
            .then((result) => {
              this.onModelCreate(result);
              this.toast.success('created');
            }).catch(error => this.toast.error(error.message));
        }
      });
  }
}
