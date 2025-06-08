import {Component} from '@angular/core';
import {BaseDetailsComponent} from '@shared/common/BaseDetailsComponent';
import {Company} from '@api/models';

@Component({
  selector: 'admin-company-pay-preferences-details',
  templateUrl: './company-pay-preferences-details.component.html',
  styleUrls: ['./company-pay-preferences-details.component.css']
})
export class CompanyPayPreferencesDetailsComponent extends BaseDetailsComponent<Company> {
}
