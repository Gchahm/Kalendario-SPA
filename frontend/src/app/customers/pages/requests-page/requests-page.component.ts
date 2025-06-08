import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {RequestModel} from '@api/models';

import * as fromCustomers from '@customers/state';
import {Moment} from 'moment';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsPageComponent implements OnInit {

  requests$: Observable<RequestModel[]>;
  selected$: Observable<RequestModel>;

  constructor(private store: Store<fromCustomers.State>,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.store.dispatch(fromCustomers.initializeStore({date: moment.utc().startOf('month')}));
    this.requests$ = this.store.pipe(select(fromCustomers.getRequests));
    this.selected$ = this.store.pipe(select(fromCustomers.getSelectedRequest));
    const id = +this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.store.dispatch(fromCustomers.requestEntity({id}));
    }
  }

  requestRequests(date: Moment) {
    this.store.dispatch(fromCustomers.requestEntities({date}));
  }

  selectRequest(id: number) {
    this.store.dispatch(fromCustomers.setSelectedId({id}));
  }

}
