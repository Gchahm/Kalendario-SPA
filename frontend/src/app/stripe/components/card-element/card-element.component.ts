import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PaymentIntent, StripeCardElementOptions, StripeError} from '@stripe/stripe-js';
import {StripeCardComponent, StripeService} from 'ngx-stripe';

@Component({
  selector: 'stripe-card-element',
  templateUrl: './card-element.component.html',
  styleUrls: ['./card-element.component.css']
})
export class CardElementComponent {
  @Input() clientSecret: string;
  @Input() total: string;
  @Output() confirmPay = new EventEmitter<PaymentIntent>();
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {style};
  error: StripeError;

  constructor(private stripeService: StripeService) {
  }

  async emitPay() {
    this.stripeService.confirmCardPayment(this.clientSecret, {payment_method: {card: this.card.element}})
      .toPromise()
      .then(({paymentIntent, error}) => {
        if (error) {
          this.error = error;
        }
        if (paymentIntent) {
          this.confirmPay.emit(paymentIntent);
        }
      });
  }
}

const style = {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};
