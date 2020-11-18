import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import * as fromUsers from '@app/admin-users/state';
import {EffectsModule} from '@ngrx/effects';
import {UsersEffects} from '@app/admin-users/state/users.effects';
import {UserViewShellComponent} from './containers/user-view-shell/user-view-shell.component';
import {UserRwComponent} from './components/user-rw/user-rw.component';
import {SharedModule} from '@shared/shared.module';
import {UserGroupsFormComponent} from '@app/admin-users/components/user-groups-form/user-groups-form.component';
import {UserPasswordFormComponent} from '@app/admin-users/components/user-password-form/user-password-form.component';


@NgModule({
  declarations: [
    UserViewShellComponent,
    UserGroupsFormComponent,
    UserRwComponent,
    UserPasswordFormComponent,
  ],
  exports: [
    UserViewShellComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromUsers.storeName, fromUsers.reducer),
    EffectsModule.forFeature([
      UsersEffects,
    ])
  ]
})
export class AdminUsersModule {
}
