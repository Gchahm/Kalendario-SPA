import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {reactiveFormErrorHandler} from '@shared/common/Util';
import {ApiError, ValidationError} from '@api/Errors';
import {environment} from '../../../../environments/environment';
import {LoginModel} from '@api/models/LoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  showFbLogin = !environment.production;

  @Input()
  set apiError(error: ApiError) {
    if (error instanceof ValidationError) {
      reactiveFormErrorHandler(this.form, error);
    }
  }

  @Output() login = new EventEmitter<LoginModel>()
  @Output() register = new EventEmitter<void>()

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginClick() {
    this.login.emit(this.form.value);
  }

  registerClick() {
    this.register.emit();
  }
}
