import {Component, OnInit} from '@angular/core';
import {BaseContainer} from '@app/containers/BaseContainer';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromCompany from '@company/state';

@Component({
  selector: 'company-employees-shell',
  templateUrl: './employee-list-page.component.html',
  styleUrls: ['./employee-list-page.component.scss']
})
export class EmployeeListPageComponent extends BaseContainer implements OnInit {

  employees$: Observable<fromCompany.CompanyEmployeeModel[]>;
  companyName$: Observable<string>;


  constructor(protected store: Store<fromCompany.State>) {
    super(store);
  }

  ngOnInit() {
    this.employees$ = this.store.pipe(select(fromCompany.getCompanyEmployeeModels));
    this.companyName$ = this.store.pipe(select(fromCompany.getCompanyName))
  }
}
