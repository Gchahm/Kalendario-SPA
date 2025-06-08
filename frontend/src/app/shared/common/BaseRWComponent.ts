import {EventEmitter, Input, Output} from '@angular/core';
import {ApiError, ValidationError} from '@api/Errors';
import {FormControl, FormGroup} from '@angular/forms';
import {reactiveFormErrorHandler} from '@shared/common/Util';

export abstract class BaseRWComponent<R> {
  public form: FormGroup;
  private _model: R;
  private _apiError: ApiError;

  abstract writeModel();

  @Input() set model(value: R) {
    this._model = value;
    if (!this.form) {
      this.createForm();
    } else {
      this.updateForm();
    }
  }
  get model(): R {
    return this._model;
  }

  @Input() set apiError(value: ApiError) {
    this._apiError = value;
    reactiveFormErrorHandler(this.form, value);
  }
  get apiError(): ApiError {
    return this._apiError;
  }

  @Input() editMode = false;
  @Input() isMobile: boolean;
  @Input() isTablet: boolean;

  @Output() edit = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<R>();

  emitEdit() {
    this.edit.emit(true);
  }

  cancel() {
    this.updateForm();
    this.edit.emit(false);
  }

  submitForm() {
    this.update.emit(this.form.value);
  }

  protected createForm() {
    const initData = this.writeModel();
    this.form = new FormGroup({});
    for (const property in initData) {
      if (initData.hasOwnProperty(property)) {
        this.form.addControl(property, new FormControl(initData[property]));
      }
    }
  }

  private updateForm() {
    const initData = this.writeModel();
    this.form.patchValue(initData);
  }
}
