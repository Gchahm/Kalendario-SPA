import {EventEmitter, Input, Output} from '@angular/core';
import {ApiError, ValidationError} from '@api/Errors';
import {reactiveFormErrorHandler} from '@shared/common/Util';
import {FormGroup} from '@angular/forms';

export abstract class FormComponent<T>  {
  @Input() set apiError(error: ApiError) {
    if (error instanceof ValidationError) {
      reactiveFormErrorHandler(this.form, error);
    }
  }
  @Output() submitForm = new EventEmitter<T>();
  @Output() cancel = new EventEmitter<void>();
  form: FormGroup;

  submit() {
    this.submitForm.emit(this.form.value);
  }

  emitCancel() {
    this.cancel.emit();
  }
}

