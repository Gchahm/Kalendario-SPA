import {Component, OnInit} from '@angular/core';
import {Feature} from '@app/landing/components/feature-card/feature-card.component';
import {Store} from '@ngrx/store';
import * as fromCore from '@core/state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  features: Feature[];
  isLoggedIn$: Observable<boolean>;

  constructor(
    private store: Store<fromCore.CoreState>,
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(fromCore.getIsLoggedIn);

    this.features = [
      {
        title: 'APPOINTMENT CALENDAR',
        description: 'Manage upcoming appointments for all of your ' +
          'service providers with support for both scheduled appointments and walk-in customers',
        image: 'assets/img/landing-page/Feature-1.png'
      },
      {
        title: 'CUSTOMER DATABASE',
        description: 'Maintain your own customer database enabling your company to optimize customer experience ' +
          'by keeping a record of all appointments each customer made.',
        image: 'assets/img/landing-page/Feature-2.png'
      },
      {
        title: 'WALK-IN MANAGEMENT',
        description: 'Manage upcoming appointments for all of your service providers with support ' +
          'for both scheduled appointments and walk-in customers',
        image: 'assets/img/landing-page/Feature-3.png'
      },
      {
        title: 'EMAIL REMINDERS',
        description: 'Automatically reminds customers of created appointments ',
        image: 'assets/img/landing-page/Feature-4.png'
      },
      {
        title: 'EMPLOYEE MANAGEMENT',
        description: 'Manage upcoming appointments for all of your service providers with support' +
          ' for both scheduled appointments and walk-in customers',
        image: 'assets/img/landing-page/Feature-5.png'
      },
      {
        title: 'BROADCASTING YOUR SVS',
        description: 'Manage upcoming appointments for all of your service providers with support' +
          ' for both scheduled appointments and walk-in customers',
        image: 'assets/img/landing-page/Feature-3.png'
      }
    ];
  }
}

