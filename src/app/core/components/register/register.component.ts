import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ToastService} from '@shared/services/toast.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@api/clients/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerSubscription: Subscription;
  form;

  constructor(private authService: AuthService,
              private router: Router,
              private alertify: ToastService,
              private fb: FormBuilder) {
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
      validators: [this.passwordMatchValidator]
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password1').value === g.get('password2').value ? null : {mismatch: true};
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }

  register() {
    if (this.form.valid) {
      this.registerSubscription = this.authService.register(this.form.value)
        .subscribe(next => {
        this.alertify.success('User registered');
        this.router.navigate(['account-confirm-email']);
      }, error1 => {
        this.alertify.error(error1);
      });
    }
  }


}
