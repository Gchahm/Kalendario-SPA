import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Moment} from 'moment';
import {BaseContainer} from '@app/containers/BaseContainer';
import {Service} from '@api/models';
import * as fromCompany from '@company/state';

@Component({
  selector: 'company-slots-for-service-shell',
  templateUrl: './slots-for-service-shell.component.html',
  styleUrls: ['./slots-for-service-shell.component.css']
})
export class SlotsForServiceShellComponent extends BaseContainer implements OnInit {
  serviceSlots: Observable<fromCompany.ServiceSlot[]>;
  getCurrentSlotId$: Observable<number>;
  isLoading$: Observable<boolean>;
  date$: Observable<Moment>;
  service$: Observable<Service>;
  @Input() hasShadow = true;

  constructor(protected store: Store<fromCompany.State>) {
    super(store);
  }

  ngOnInit(): void {
    this.serviceSlots = this.store.select(fromCompany.getServiceSlots);
    this.getCurrentSlotId$ = this.store.select(fromCompany.getCurrentSlotId);
    this.date$ = this.store.select(fromCompany.getCurrentMomentDate);
    this.service$ = this.store.select(fromCompany.getCurrentService);
    this.isLoading$ = this.store.select(fromCompany.getIsLoadingSlots);
  }




}
