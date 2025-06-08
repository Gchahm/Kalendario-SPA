import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseContainer} from '@app/containers/BaseContainer';
import {DashBoardRoute} from '@shared/components/dashboard-container/dashboard-container.component';
import {Store} from '@ngrx/store';
import * as fromCore from '@core/state';
import {State} from '@app/state';

@Component({
  selector: 'shared-dashboard-container-shell',
  templateUrl: './dashboard-container-shell.component.html',
  styleUrls: ['./dashboard-container-shell.component.css']
})
export class DashboardContainerShellComponent extends BaseContainer implements OnDestroy {

  @Input() routes: DashBoardRoute[];

  constructor(protected store: Store<State>) {
    super(store);
  }

  showLeftPaneButton(): void {
    this.store.dispatch(new fromCore.ToggleShowLeftPaneButton(true));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new fromCore.ToggleShowLeftPaneButton(false));
  }

  toggleShowLeftPane() {
    this.store.dispatch(new fromCore.ToggleLeftPane());
  }
}

