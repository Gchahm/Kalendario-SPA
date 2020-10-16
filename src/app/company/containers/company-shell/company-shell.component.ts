import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import * as fromCompany from '@company/state';
import * as fromCore from '@core/state';
import * as moment from 'moment';

@Component({
  selector: 'company-shell',
  templateUrl: './company-shell.component.html',
  styleUrls: ['./company-shell.component.scss']
})
export class CompanyShellComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private store: Store<fromCompany.State>) {
  }

  ngOnInit() {
    const company = this.route.snapshot.paramMap.get('cid');
    this.store.dispatch(new fromCompany.RequestCompany(company));
    this.store.dispatch(new fromCore.SetCompanyName(company));
    this.observeAndReloadSlots();
    this.requestAddAppointmentFromParams();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new fromCore.SetCompanyName(null));
    this.store.dispatch(new fromCompany.SetCurrentServiceId(null));
  }

  observeAndReloadSlots() {
    this.subscription = this.store.pipe(
      select(fromCompany.getSlotsParams),
      filter(params => params !== null)
    ).subscribe(params => this.store.dispatch(new fromCompany.RequestSlots()));
  }

  requestAddAppointmentFromParams() {
    for (const key of this.route.snapshot.queryParamMap.keys) {
      switch (key) {
        case 'service':
          this.store.dispatch(new fromCompany.SetCurrentServiceId(+this.route.snapshot.queryParamMap.get('service')));
          break;
        case 'employee':
          this.store.dispatch(new fromCompany.SetCurrentServiceId(+this.route.snapshot.queryParamMap.get('employee')));
          break;
        case 'date':
          this.store.dispatch(new fromCompany.SetDate(moment.utc(this.route.snapshot.queryParamMap.get('date'))));
          break;
      }
    }
    this.store.dispatch(new fromCompany.RequestAddAppointmentRequest());
  }
}
