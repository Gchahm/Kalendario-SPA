import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IAppointment, CompanyDetailsResult, RequestModel} from '@api/models';
import {StripePaymentDetails} from '@api/clients/RequestClient.service';

@Component({
  selector: 'company-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent {
  private _request: RequestModel;
  @Input() set request(request: RequestModel) {
    this._request = request;
    this.customerNotes = request.customerNotes;
  }
  get request(): RequestModel {
    return this._request;
  }
  @Input() company: CompanyDetailsResult;
  @Input() paymentDetails: StripePaymentDetails;
  @Input() preBookMessage: string;
  @Output() confirm = new EventEmitter<string>();

  customerNotes: string;

  confirmRequest() {
    this.confirm.emit(this.customerNotes);
  }
}
