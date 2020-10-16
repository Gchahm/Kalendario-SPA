import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserPasswordWriteModel} from '@api/clients/UserAdminClient';

@Component({
  selector: 'admin-update-password',
  templateUrl: './user-password-form.component.html',
  styleUrls: ['./user-password-form.component.css']
})
export class UserPasswordFormComponent implements OnInit {
  form: FormGroup;

  @Output() update = new EventEmitter<UserPasswordWriteModel>();
  @Output() cancel = new EventEmitter<void>();

  ngOnInit() {
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
    this.cancel.emit();
  }
}
