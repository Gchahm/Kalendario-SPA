import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {errorAttacher} from '../../../shared/common/Util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginSubscription: Subscription;
  form;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  login() {
    this.loginSubscription = this.authService.login(this.form.value).subscribe(next => {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigate([returnUrl]);
    }, error => {
      if (error.status = 422) {
        errorAttacher(this.form, error.detail);
      }
      this.form.patchValue({password: ''});
    });
  }

  FBLogin() {
    this.authService.FBLogin();
  }
}
