import { Component } from '@angular/core';
import {AuthService} from '@api/clients/auth.service';
import {ApiError} from '@api/Errors';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent {
  email: string;
  apiError: ApiError;
  message: string;

  constructor(private authService: AuthService) { }

  submit(form: {email: string}) {
    this.authService.resetPassword(form)
      .toPromise()
      .then(r => this.message = r.detail)
      .catch(e => this.apiError = e);
  }
}
