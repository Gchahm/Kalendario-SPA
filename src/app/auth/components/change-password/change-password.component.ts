import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {IChangePassword} from '@api/models';
import {FormComponent} from '@app/auth/commom/form.component';
import {matcherValidator} from '@app/auth/commom/validators';

@Component({
  selector: 'auth-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends FormComponent<IChangePassword> implements OnInit {
  constructor(public fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
        oldPassword: this.fb.control('', [Validators.required]),
        newPassword1: ['', [Validators.required, Validators.minLength(8)]],
        newPassword2: ['', [Validators.required]],
      },
      {
        validator: matcherValidator('newPassword1', 'newPassword2')
      });
  }
}
