import {AfterContentChecked, Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {FacebookAuthService} from '@app/auth/services/facebook-auth.service';

import StatusResponse = facebook.StatusResponse;

@Component({
  selector: 'auth-facebook-button',
  templateUrl: './facebook-button.component.html',
  styleUrls: ['./facebook-button.component.css']
})
export class FacebookButtonComponent implements AfterContentChecked, OnDestroy {

  @Input() isMobile: boolean;
  @ViewChild('someInput') facebookButton;
  initialized = false;

  @Output() success = new EventEmitter<string>();

  constructor(private fb: FacebookAuthService) {
  }

  ngAfterContentChecked() {
    if (!this.initialized && this.facebookButton) {
      this.initialized = true;
      this.fb.createButton();
      this.fb.onLogin((response) => this.handleResponse(response));
    }
  }

  handleResponse(response: StatusResponse) {
    if (response.status === 'connected') {
      this.success.emit(response.authResponse.accessToken);
    }
  }

  ngOnDestroy() {
    this.fb.unsubscribeLogin(() => {});
  }
}
