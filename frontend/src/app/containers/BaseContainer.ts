import {select, Store} from '@ngrx/store';
import {State} from '@app/state';
import {Observable} from 'rxjs';

import * as fromCore from '@core/state';

import * as fromCompany from '@company/state';
import {IUser} from '@api/models';

export abstract class BaseContainer {

  isMobile$: Observable<boolean>;
  isTablet$: Observable<boolean>;
  leftPaneOpen$: Observable<boolean>;
  user$: Observable<IUser>;

  protected constructor(protected store: Store<State | fromCompany.State>) {
    this.isMobile$ = this.store.pipe(select(fromCore.getIsMobileView));
    this.isTablet$ = this.store.pipe(select(fromCore.getIsTabletView));
    this.user$ = this.store.pipe(fromCore.getCurrentUser);
    this.leftPaneOpen$ = this.store.pipe(select(fromCore.getIsLeftPaneOpen));
  }
}
