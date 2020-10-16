import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {CompanyDetailsResult} from '@api/models';
import {Store} from '@ngrx/store';
import * as fromCompany from '@company/state';

@Component({
  selector: 'company-logo-shell',
  templateUrl: './company-logo-shell.component.html',
  styleUrls: ['./company-logo-shell.component.css']
})
export class CompanyLogoShellComponent {
  company$: Observable<CompanyDetailsResult>;

  constructor(private store: Store<fromCompany.State>) {
    this.company$ = store.select(fromCompany.getCompany);
  }
}
