import {Component, OnInit} from '@angular/core';
import {AuthFormComponent} from '@app/auth/commom/authFormComponent';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'auth-reset-password-request-form',
  templateUrl: './reset-password-request-form.component.html',
  styleUrls: ['./reset-password-request-form.component.css']
})
export class ResetPasswordRequestFormComponent extends AuthFormComponent<{ email: string }> implements OnInit {
  constructor(public fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
  }
}
