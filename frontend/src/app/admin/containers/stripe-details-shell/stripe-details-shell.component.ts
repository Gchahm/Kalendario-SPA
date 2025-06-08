import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import * as fromCompany from '@admin/state/company';
import {Company, CompanyStripeDetails} from '@api/models';
import {Observable} from 'rxjs';

@Component({
  selector: 'admin-stripe-details-shell',
  templateUrl: './stripe-details-shell.component.html',
  styleUrls: ['./stripe-details-shell.component.css'],
})
export class StripeDetailsShellComponent implements OnInit {

  stripeDetails$: Observable<CompanyStripeDetails>;
  company$: Observable<Company>;

  constructor(protected store: Store<State>) {
  }

  ngOnInit() {
    this.store.dispatch(new fromCompany.RequestStripeDetails());
    this.stripeDetails$ = this.store.select(fromCompany.getCompanyStripeDetails);
    this.company$ = this.store.select(fromCompany.getCompany);
  }

  post() {
    this.store.dispatch(new fromCompany.RequestCreateStripeAccount());
  }
}
