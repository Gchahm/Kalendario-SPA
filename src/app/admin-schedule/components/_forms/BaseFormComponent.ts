import {IReadModel} from '../../../core/models/interfaces/IReadModel';
import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IDjangoService} from '../../../shared/common/IDjangoService';
import {IWriteModel} from '../../../core/models/interfaces/IWriteModel';
import {reactiveFormErrorHandler} from '../../../shared/common/Util';
import {ValidationError} from '../../../shared/common/Errors';
import {error} from 'selenium-webdriver';

export abstract class BaseFormComponent<R extends IReadModel> implements OnInit {

  @Input() htmlAction: string;
  @Input() model: R;
  @Input() showButtons = true;
  @Output() submitConcluded = new EventEmitter<IReadModel>();
  @Output() cancelClicked = new EventEmitter();

  form: FormGroup;

  protected constructor(private service: IDjangoService<R, IWriteModel>) {
  }

  createForm() {
    const initData = this.model.writeModel();
    this.form = new FormGroup({});
    for (const property in initData) {
      if (initData.hasOwnProperty(property)) {
        this.form.addControl(property, new FormControl(initData[property]));
      }
    }
  }

  ngOnInit() {
    this.createForm();
  }

  beforeSubmit(): void {
  }

  submit() {
    this.beforeSubmit();
    this.action().toPromise()
      .then((res: R) => {
        this.submitConcluded.emit(res);
      })
      .catch(err => {
        if (err instanceof ValidationError) {
          reactiveFormErrorHandler(this.form, err);
        }
      });
  }

  cancel() {
    this.cancelClicked.emit();
  }

  private action() {
    switch (this.htmlAction) {
      case 'PATCH':
        return this.service.patch(this.form.value.id, this.form.value);
      case 'DELETE':
        return this.service.delete(this.form.value.id);
      case 'CREATE':
        return this.service.post(this.form.value);
    }
  }
}
