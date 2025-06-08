import { Component } from '@angular/core';
import {AuthService} from '@api/clients/auth.service';
import {ApiError} from '@api/Errors';

@Component({
  selector: 'auth-reset-password-request-page',
  templateUrl: './reset-password-request-page.component.html',
  styleUrls: ['./reset-password-request-page.component.css']
})
export class ResetPasswordRequestPageComponent {
  email: string;
  apiError: ApiError;
  message: string;

  constructor(private authService: AuthService) { }

  submit(form: {email: string}) {
    this.authService.resetPasswordRequest(form)
      .toPromise()
      .then(r => this.message = r.detail)
      .catch(e => this.apiError = e);
  }
}
