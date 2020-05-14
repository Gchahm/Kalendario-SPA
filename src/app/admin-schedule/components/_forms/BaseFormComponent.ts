import {IReadModel} from '../../../core/models/interfaces/IReadModel';
import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IDjangoService} from '../../../shared/common/IDjangoService';
import {IWriteModel} from '../../../core/models/interfaces/IWriteModel';

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
        if (err && err.status === 422) {
          const validationErrors = err.detail;
          // If the error comes from the server in an array form it doesn't belong to the form
          if (Array.isArray(validationErrors)) {
            this.form.setErrors(validationErrors);
          } else {
            // Other error should be dictionaries with keys for the field name a a string for what the error is about
            // The key will match with the formControl name and this will ensure that the error will be raised against
            // the correct form
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
