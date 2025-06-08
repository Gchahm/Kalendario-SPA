import { Component, OnInit } from '@angular/core';
import * as fromCompany from '@company/state';
import {Moment} from 'moment';
import {Store} from '@ngrx/store';
import {BaseContainer} from '@app/containers/BaseContainer';
import {Observable} from 'rxjs';

@Component({
  selector: 'company-slots-for-service-header-shell',
  templateUrl: './slots-for-service-header-shell.component.html',
  styleUrls: ['./slots-for-service-header-shell.component.css']
})
export class SlotsForServiceHeaderShellComponent extends BaseContainer implements OnInit {
  date$: Observable<Moment>;
  disableDateInput$: Observable<boolean>;

  constructor(protected store: Store<fromCompany.State>) {
    super(store);
  }
  ngOnInit(): void {
    this.date$ = this.store.select(fromCompany.getCurrentMomentDate);
    this.disableDateInput$ = this.store.select(fromCompany.getDisableDateInput);
  }

  setDate(value: Moment) {
    this.store.dispatch(new fromCompany.SetDate(value));
  }


}
