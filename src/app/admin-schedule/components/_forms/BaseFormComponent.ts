import {IReadModel} from '../../../core/models/interfaces/IReadModel';
import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModelEvent} from '../../events/ModelEvent';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {select} from '@angular-redux/store';
import {IAppState} from '../../../Store';
import {Observable} from 'rxjs';
import {CustomerService} from '../../services/customer.service';
import {AdminModelService} from '../../../core/generics/services/AdminModelService';
import {IDjangoService} from '../../../shared/common/IDjangoService';
import {IWriteModel} from '../../../core/models/interfaces/IWriteModel';

export abstract class BaseFormComponent<R extends IReadModel> implements OnInit {

  @Input() htmlAction: string;
  @Input() model: R;
  @Input() showButtons = true;
  @Output() submitConcluded = new EventEmitter();
  @Output() cancelClicked = new EventEmitter();

  form: FormGroup;
  error: any;

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
      .then(res => {
        this.submitConcluded.emit();
      })
      .catch(err => {
        this.error = err;
        if (err && err.status === 422) {
          const validationErrors = err.detail;
          if (Array.isArray(validationErrors)) {
            this.form.setErrors(validationErrors);
          } else {
            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.form.get(prop);
              if (formControl) {
                formControl.setErrors({
                  serverError: validationErrors[prop]
                });
              }
            });
          }
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
