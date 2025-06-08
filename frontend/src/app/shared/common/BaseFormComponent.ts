import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {reactiveFormErrorHandler} from '@shared/common/Util';
import {ApiError, ValidationError} from '@api/Errors';
import {IReadModel} from '@api/models/IReadModel';

export abstract class BaseFormComponent<R extends IReadModel> implements OnInit {

  private _model: R;

  /**The input updates the value for model and recreate the form every time a new model is provided
   By checking the difference between ids.*/
  @Input() set model(value: R) {
    if (!this._model || value.id !== this._model.id) {
      this._model = value;
      this.createForm();
    }
  };

  get model(): R {
    return this._model;
  }

  @Input()
  set apiError(error: ApiError) {
    if (error instanceof ValidationError) {
      reactiveFormErrorHandler(this.form, error);
    }
  }

  @Input() showButtons = true;
  /** Emits when the submit button is clicked with the form value if the id of the model passed was zero */
  @Output() create = new EventEmitter<R>();
  /** Emits when the submit button is clicked with the form value if the id of the model passed was not zero */
  @Output() update = new EventEmitter<R>();
  /** Emits when the cancel button is clicked with true for when the model is a new model */
  @Output() cancel = new EventEmitter<boolean>();

  form: FormGroup;

  abstract writeModel(): object;

  createForm() {
    const initData = this.writeModel();
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

  submit() {
    if (this.model.id === 0 || !this.model.id) {
      this.create.emit(this.form.value);
    } else {
      this.update.emit(this.form.value);
    }
  }

  emitCancel() {
    this.cancel.emit(this.model.id === 0);
  }
}
