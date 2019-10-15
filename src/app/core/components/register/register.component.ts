import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ToastService} from '../../../shared/services/toast.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../admin-schedule/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerSubscription: Subscription;
  registerForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private alertify: ToastService) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password1: new FormControl('',
        [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', Validators.required),
    }, this.passwordMatchValidator);
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
    if (this.registerForm.valid) {
      const validatedForm = Object.assign({}, this.registerForm.value);
      this.registerSubscription = this.authService.register(validatedForm).subscribe(next => {
        this.alertify.success('User registered');
      }, error1 => {
        this.alertify.error(error1);
      });
    }
  }


}
