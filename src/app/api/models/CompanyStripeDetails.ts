import {Injectable} from '@angular/core';
import {Adapter} from '../adapter';
import {IReadModel} from './IReadModel';


export class CompanyStripeDetails implements IReadModel {
  static modelType = 'companyMessages';
  name = '';
  id: number;
  stripeDetailsSubmitted: boolean;
  stripeChargesEnabled: boolean;
  stripePayoutsEnabled: boolean;
  stripeDefaultCurrency: boolean;

  static fromJs(data: any): CompanyStripeDetails {
    data = typeof data === 'object' ? data : {};
    const result = new CompanyStripeDetails();
    if (data) {
      result.id = data.ownerId;
      result.stripeDetailsSubmitted = data.stripeDetailsSubmitted;
      result.stripeChargesEnabled = data.stripeChargesEnabled;
      result.stripePayoutsEnabled = data.stripePayoutsEnabled;
      result.stripeDefaultCurrency = data.stripeDefaultCurrency;
    }
    return result;
  }


}

@Injectable({
  providedIn: 'root'
})
export class CompanyStripeDetailsAdapter implements Adapter<CompanyStripeDetails> {
  adapt(data: any): CompanyStripeDetails {
    return CompanyStripeDetails.fromJs(data);
  }
}
