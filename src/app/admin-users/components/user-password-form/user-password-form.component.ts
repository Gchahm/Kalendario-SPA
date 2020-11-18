import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserPasswordWriteModel} from '@api/clients/UserAdminClient';
import {ApiError, ValidationError} from '@api/Errors';
import {reactiveFormErrorHandler} from '@shared/common/Util';

@Component({
  selector: 'admin-update-password',
  templateUrl: './user-password-form.component.html',
  styleUrls: ['./user-password-form.component.css']
})
export class UserPasswordFormComponent implements OnInit {
  form: FormGroup;

  private _error: ApiError;
  @Input() set error(value: ApiError) {
    this._error = value;
    if (value instanceof ValidationError) {
      reactiveFormErrorHandler(this.form, value);
    }
  }
  get error(): ApiError {
    return this._error;
  }

  @Output() update = new EventEmitter<UserPasswordWriteModel>();
  @Output() cancel = new EventEmitter<void>();

  ngOnInit() {
    this.generateForm();
  }

  generateForm() {
    this.form = new FormGroup({
      userPassword: new FormControl('', [Validators.required]),
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.update.emit(this.form.value);
  }

  emitCancel() {
    this.generateForm();
    this.cancel.emit();
  }
}
