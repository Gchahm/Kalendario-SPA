import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Appointment, CompanyDetailsResult, RequestModel} from '@api/models';
import {StripePaymentDetails} from '@api/clients/RequestClient.service';

@Component({
  selector: 'company-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent {
  @Input() request: RequestModel;
  @Input() company: CompanyDetailsResult;
  @Input() paymentDetails: StripePaymentDetails;
  @Input() preBookMessage: string;
  @Input() checkoutMode: boolean;
  @Output() confirm = new EventEmitter<string>();
  @Output() checkout = new EventEmitter<boolean>();
  @Output() requestPaymentDetails = new EventEmitter<number>();

  customerNotes: string;

  appointments(): Appointment[] {
    return this.request.items.reduce((p, i) => p.concat(i.appointments), []);
  }

  proceedCheckout() {
    this.checkout.emit(true);
  }

  confirmRequest() {
    this.confirm.emit(this.customerNotes);
  }
}
