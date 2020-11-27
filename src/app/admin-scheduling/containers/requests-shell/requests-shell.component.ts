import {Component, EventEmitter, Output} from '@angular/core';
import {BaseEntityPage} from '@admin/pages/BaseEntityPage';
import {RequestModel} from '@api/models';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import {Moment} from 'moment';
import * as fromRequests from '@app/admin-scheduling/state/requests';

@Component({
  selector: 'admin-requests-shell',
  templateUrl: './requests-shell.component.html',
  styleUrls: ['./requests-shell.component.css'],
})
export class RequestsShellComponent extends BaseEntityPage<RequestModel> {
  @Output() dateChange = new EventEmitter<Moment>();

  constructor(protected store: Store<State>) {
    super(store, fromRequests.actions, fromRequests.selectors, {status: 'P'});
  }

  accept(id: number) {
    this.store.dispatch(fromRequests.actions.acceptRequest({id}));
  }

  reject(id: number) {
    this.store.dispatch(fromRequests.actions.rejectRequest({id}));
  }
}
