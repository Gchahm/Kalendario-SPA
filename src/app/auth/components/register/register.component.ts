import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RegisterModel} from '@api/clients/auth.service';
import {FormComponent} from '@app/auth/commom/form.component';
import {matcherValidator} from '@app/auth/commom/validators';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends FormComponent<RegisterModel> implements OnInit {
  constructor(private fb: FormBuilder) {
    super();
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
        validator: matcherValidator('password1', 'password2')
      });
  }
}

