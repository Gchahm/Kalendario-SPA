import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CompanyDetailsResult, RequestModel} from '@api/models';
import {Store} from '@ngrx/store';
import * as fromCompany from '@company/state';
import {StripePaymentDetails} from '@api/clients/RequestClient.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent implements OnInit, OnDestroy {

  request$: Observable<RequestModel>;
  company$: Observable<CompanyDetailsResult>;
  paymentDetails$: Observable<StripePaymentDetails>;
  preBookMessage$: Observable<string>;
  checkoutMode$: Observable<boolean>;

  constructor(protected store: Store<fromCompany.State>) {}

  ngOnInit(): void {
    this.request$ = this.store.select(fromCompany.getCurrentRequest);
    this.company$ = this.store.select(fromCompany.getCompany);
    this.paymentDetails$ = this.store.select(fromCompany.getPaymentDetails);
    this.preBookMessage$ = this.store.select(fromCompany.getPreBookMessage);
    this.checkoutMode$ = this.store.select(fromCompany.getCheckoutMode);
  }

  ngOnDestroy() {
    this.store.dispatch(new fromCompany.SetPaymentDetails(null));
    this.store.dispatch(new fromCompany.SetCheckoutMode(false));
  }

  removeItem(id: number) {
    this.store.dispatch(new fromCompany.RequestRemoveAppointment(id));
  }

  requestPaymentDetails(id: number) {
    this.store.dispatch(new fromCompany.RequestPaymentDetails(id));
  }

  confirm(customerNotes: string) {
    this.store.dispatch(new fromCompany.RequestConfirmCart(customerNotes));
  }

  setCheckoutMode(value: boolean) {
    this.store.dispatch(new fromCompany.SetCheckoutMode(value));
  }
}
