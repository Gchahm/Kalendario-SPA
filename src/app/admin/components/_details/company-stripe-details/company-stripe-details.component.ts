import {Component, EventEmitter, Output} from '@angular/core';
import {BaseDetailsComponent} from '@shared/common/BaseDetailsComponent';
import {CompanyStripeDetails} from '@api/models';

@Component({
  selector: 'admin-company-stripe-details',
  templateUrl: './company-stripe-details.component.html',
  styleUrls: ['./company-stripe-details.component.css']
})
export class CompanyStripeDetailsComponent extends BaseDetailsComponent<CompanyStripeDetails> {
  @Output() edit = new EventEmitter<void>();
}
