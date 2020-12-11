import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {BaseContainer} from '@app/containers/BaseContainer';
import {Observable} from 'rxjs';

import * as fromCompany from '@company/state';
import {IEmployee} from '@api/models';

@Component({
  selector: 'company-employee-details-page',
  templateUrl: './employee-details-page.component.html',
  styleUrls: ['./employee-details-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailsPageComponent extends BaseContainer implements OnInit, OnDestroy {

  model$: Observable<IEmployee>;
  companyName$: Observable<string>;

  constructor(protected store: Store<fromCompany.State>,
              private route: ActivatedRoute) {
    super(store);
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new fromCompany.SetCurrentEmployeeId(id));
    this.model$ = this.store.select(fromCompany.getCurrentEmployee);
    this.companyName$ = this.store.select(fromCompany.getCompanyName);
    this.store.dispatch(new fromCompany.SetCurrentServiceId(null));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromCompany.SetCurrentEmployeeId(null));
  }
}
