import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import {ViewShellComponent} from '@shared/common/ViewShellComponent';
import * as fromServices from '@app/admin-services/state';
import {Service} from '@api/models';
import {Observable} from 'rxjs';

@Component({
  selector: 'admin-service-view-shell',
  templateUrl: './service-view-shell.component.html',
  styleUrls: ['./service-view-shell.component.css']
})
export class ServiceViewShellComponent extends ViewShellComponent<Service> {
  fullModel$: Observable<fromServices.ServiceFullModel>;
  constructor(protected store: Store<State>) {
    super(store, fromServices.actions, fromServices.selectors);
    this.fullModel$ = this.store.select(fromServices.selectors.getCurrentServiceFullModel);
  }
}
