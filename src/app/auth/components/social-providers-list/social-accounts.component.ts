import {Component, Input} from '@angular/core';
import {ISocialAccount} from '@api/models';

@Component({
  selector: 'auth-social-accounts',
  templateUrl: './social-accounts.component.html',
  styleUrls: ['./social-accounts.component.css']
})
export class SocialAccountsComponent {
  @Input() set socialAccounts(socialAccounts: ISocialAccount[]) {
    this.facebook = socialAccounts.find(s => s.provider === 'facebook');
  }
  facebook: ISocialAccount;
}
