import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {CompanyDetailsResult} from '@api/models';
import {Store} from '@ngrx/store';
import * as fromCompany from '@company/state';
import {fadeInDownOnEnterAnimation, fadeInOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'company-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeInDownOnEnterAnimation()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {
  company$: Observable<CompanyDetailsResult>;

  constructor(protected store: Store<fromCompany.State>) {
    this.company$ = this.store.select(fromCompany.getCompany);
  }
}

