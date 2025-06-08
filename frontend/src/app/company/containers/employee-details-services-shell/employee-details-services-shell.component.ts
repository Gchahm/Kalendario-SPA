import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromCompany from '@company/state';
import {Observable} from 'rxjs';
import {Service} from '@api/models';

@Component({
  selector: 'company-employee-details-services-shell',
  templateUrl: './employee-details-services-shell.component.html',
  styleUrls: ['./employee-details-services-shell.component.css']
})
export class EmployeeDetailsServicesShellComponent implements OnInit {

  services$: Observable<Service[]>;
  selected$: Observable<number>;
  search$: Observable<string>;

  constructor(protected store: Store<fromCompany.State>){
  }

  ngOnInit() {
    this.store.dispatch(new fromCompany.SetServiceSearch(''));
    this.services$ = this.store.select(fromCompany.getCurrentEmployeeServicesFiltered);
    this.selected$ = this.store.select(fromCompany.getCurrentServiceId);
    this.search$ = this.store.select(fromCompany.getSearch);
  }

  setSearch(value: string) {
    this.store.dispatch(new fromCompany.SetServiceSearch(value));
  }

  setCurrentService(value: number) {
    this.store.dispatch(new fromCompany.SetCurrentServiceId(value));
  }
}
