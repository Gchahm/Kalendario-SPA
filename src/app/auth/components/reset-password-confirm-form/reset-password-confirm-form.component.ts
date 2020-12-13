import {Component, Input, OnInit, Output} from '@angular/core';
import {AuthFormComponent} from '@app/auth/commom/authFormComponent';
import {ResetPassword} from '@api/models';
import {FormBuilder, Validators} from '@angular/forms';
import {matcherValidator} from '@app/auth/commom/validators';

@Component({
  selector: 'auth-reset-password-confirm-form',
  templateUrl: './reset-password-confirm-form.component.html',
  styleUrls: ['./reset-password-confirm-form.component.css']
})
export class ResetPasswordConfirmFormComponent extends AuthFormComponent<ResetPassword> implements OnInit {

  @Input() uid: string;
  @Input() token: string;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
        uid: [this.uid, [Validators.required]],
        token: [this.token, [Validators.required]],
        newPassword1: ['', [Validators.required, Validators.minLength(8)]],
        newPassword2: ['', [Validators.required]],
      },
      {
        validator: matcherValidator('newPassword1', 'newPassword2')
      });
  }
}
