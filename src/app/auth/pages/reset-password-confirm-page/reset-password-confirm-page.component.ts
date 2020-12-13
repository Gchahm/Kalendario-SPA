import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '@api/clients/auth.service';
import {ToastService} from '@shared/services/toast.service';
import {ResetPassword} from '@api/models';
import {ApiError} from '@api/Errors';

@Component({
  selector: 'auth-reset-password-confirm-page',
  templateUrl: './reset-password-confirm-page.component.html',
  styleUrls: ['./reset-password-confirm-page.component.css']
})
export class ResetPasswordConfirmPageComponent implements OnInit {

  uid: string;
  token: string;
  message: string;
  apiError: ApiError;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private toast: ToastService) {
  }


  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uidb64');
    this.token = this.route.snapshot.paramMap.get('token');
  }

  submit(form: ResetPassword) {
    this.authService.resetPasswordConfirm(form)
      .toPromise()
      .then(r => this.message = r.detail)
      .catch(e => this.apiError = e);
  }
}
