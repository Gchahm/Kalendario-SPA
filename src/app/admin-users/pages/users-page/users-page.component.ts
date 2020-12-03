import {ChangeDetectionStrategy, Component} from '@angular/core';
import {IUser} from '@api/models';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import * as fromUsers from '@app/admin-users/state';
import {BaseEntityPage} from '@admin/pages/BaseEntityPage';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent  extends BaseEntityPage<IUser> {
  constructor(protected store: Store<State>) {
    super(store, fromUsers.actions, fromUsers.selectors);
  }
}
