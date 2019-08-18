import {Component, OnDestroy, OnInit} from '@angular/core';
import {CustomerService} from '../../../customer/services/customer.service';
import {Subscription} from 'rxjs';
import {ToastService} from '../../../shared/services/toast.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {Customer} from '../../../shared/models/Customer';
import {LoginModel} from '../../../staff-services/models/LoginModel';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  customer: Customer;
  registerSubscription: Subscription;
  loginSubscription: Subscription;
  registerForm: FormGroup;

  constructor(private customerService: CustomerService,
              private authService: AuthService,
              private router: Router,
              private alertify: ToastService) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',
        [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.customer = Object.assign({}, this.registerForm.value);
      this.registerSubscription = this.customerService.register(this.customer).subscribe(next => {
        this.alertify.success('User registered');
      }, error1 => {
        this.alertify.error(error1);
      }, () => this.loginSubscription = this.authService.login(new LoginModel(this.customer.email, this.customer.password))
        .subscribe(next => {
          this.router.navigate(['/']);
        }));
    }
  }


}
