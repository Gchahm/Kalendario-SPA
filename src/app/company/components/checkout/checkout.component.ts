import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StripePaymentDetails} from '@api/clients/RequestClient.service';
import {CompanyDetailsResult, RequestModel} from '@api/models';

@Component({
  selector: 'company-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  @Input() paymentDetails: StripePaymentDetails;
  @Input() request: RequestModel;
  @Input() company: CompanyDetailsResult;
  @Output() requestPaymentDetails = new EventEmitter<number>();
  @Output() confirm = new EventEmitter<void>();
}
