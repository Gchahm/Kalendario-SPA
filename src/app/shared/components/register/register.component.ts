import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {RegisterModel} from '@shared/services/auth.service';
import {ApiError, ValidationError} from '@api/Errors';
import {reactiveFormErrorHandler} from '@shared/common/Util';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  matcher = new MyErrorStateMatcher();

  @Input()
  set apiError(error: ApiError) {
    if (error instanceof ValidationError) {
      reactiveFormErrorHandler(this.form, error);
    }
  }

  @Output() register = new EventEmitter<RegisterModel>();
  @Output() login = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
  }


  ngOnInit() {
    this.form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password1: ['', [Validators.required, Validators.minLength(8)]],
        password2: ['', [Validators.required]],
      },
      {
        validator: this.passwordMatchValidator
      });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password1').value === g.get('password2').value ? null : {mismatch: true};
  }

  loginClick(){
    this.login.emit();
  }

  registerClick() {
    this.register.emit(this.form.value);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
