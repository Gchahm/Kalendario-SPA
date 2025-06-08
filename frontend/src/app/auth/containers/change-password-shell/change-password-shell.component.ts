import {Component} from '@angular/core';
import {AuthService} from '@api/clients/auth.service';
import {IChangePassword} from '@api/models';
import {ApiError} from '@api/Errors';
import {ToastService} from '@shared/services/toast.service';

@Component({
  selector: 'auth-change-password-shell',
  templateUrl: './change-password-shell.component.html',
  styleUrls: ['./change-password-shell.component.css']
})
export class ChangePasswordShellComponent {

  apiError: ApiError;
  showForm = true;

  constructor(private auth: AuthService,
              private aleter: ToastService) {
  }

  submit(form: IChangePassword) {
    this.auth.changePassword(form)
      .toPromise()
      .then(r => {
        this.aleter.success('Successfully Changed Password');
        this.showForm = false;
      })
      .catch(error => this.apiError = error);
  }
}
