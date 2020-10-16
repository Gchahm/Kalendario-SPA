import {Injectable} from '@angular/core';

import {ServiceCategoryAdminClient} from '@api/clients';
import {ServiceCategory} from '@api/models';

import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';

import * as fromServiceCategories from '@app/admin-services/state/categories/index';
import {BaseEffectsWithDialog} from '@shared/state/base/effects';
import {MatDialog} from '@angular/material/dialog';
import {CreateServiceCategoryDialogComponent} from '@app/admin-services/containers/create-service-category/create-service-category-dialog.component';

@Injectable()
export class ServiceCategoriesEffects extends BaseEffectsWithDialog<ServiceCategory> {
  constructor(actions$: Actions,
              store: Store<fromServiceCategories.State>,
              dialog: MatDialog,
              private serviceAdminClient: ServiceCategoryAdminClient) {
    super(actions$, serviceAdminClient, fromServiceCategories.actions, fromServiceCategories.selectors,
      store, dialog, CreateServiceCategoryDialogComponent);
  }
}
