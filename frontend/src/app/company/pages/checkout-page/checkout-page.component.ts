import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {StripePaymentDetails} from '@api/clients/RequestClient.service';
import {CompanyDetailsResult, RequestModel} from '@api/models';
import {Store} from '@ngrx/store';
import * as fromCompany from '@company/state';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  paymentDetails$: Observable<StripePaymentDetails>;
  request$: Observable<RequestModel>;
  company$: Observable<CompanyDetailsResult>;

  constructor(protected store: Store<fromCompany.State>) {}

  ngOnInit(): void {
    this.company$ = this.store.select(fromCompany.getCompany);
    this.request$ = this.store.select(fromCompany.getCurrentRequest);
    this.paymentDetails$ = this.store.select(fromCompany.getPaymentDetails);
  }

  requestPaymentDetails(id: number) {
    this.store.dispatch(new fromCompany.RequestPaymentDetails(id));
  }

  submitRequest() {
    this.store.dispatch(new fromCompany.ConfirmRequest());
  }

}
