// import {Injectable} from '@angular/core';
// import { Stripe, StripeCardElement } from '@stripe/stripe-js';
// import { stripe, elements} from 'src/types/typing';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class StripePaymentService {
//
//   card: StripeCardElement;
//
//   constructor() {
//   }
//
//   initCard(publishableKey, nativeEl): StripeCardElement {
//     // stripe = Stripe(publishableKey);
//     // elements = stripe.elements();
//     this.card = elements.create('card', {style});
//     this.card.mount(nativeEl);
//     console.log(this.card);
//     return this.card;
//   }
//
//   async pay(clientSecret: string) {
//     // Initiate the payment.
//     // If authentication is required, confirmCardPayment will automatically display a modal
//     return await this.stripe
//       .confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: this.card
//         }
//       })
//       .then((result) => {
//         if (result.error) {
//           // Show error to your customer
//           // showError(result.error.message);
//         } else {
//           // The payment has been processed!
//           // this.orderComplete(clientSecret);
//         }
//       });
//   }
//
//   async orderComplete(clientSecret: string) {
//     // Just for the purpose of the sample, show the PaymentIntent response object
//     await this.stripe.retrievePaymentIntent(clientSecret).then((result) => {
//       const paymentIntent = result.paymentIntent;
//       const paymentIntentJson = JSON.stringify(paymentIntent, null, 2);
//       console.log(paymentIntentJson);
//     });
//   }
// }
//
