import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ServiceCategory} from '@api/models/ServiceCategory';

import {State} from '@admin/state';
import {Store} from '@ngrx/store';
import * as fromServiceCat from '@app/admin-services/state/categories';
import {BaseCreateDialog} from '@admin/containers/_dialogs/BaseCreateDialog';

@Component({
  selector: 'app-create-service-category',
  templateUrl: './create-service-category-dialog.component.html',
  styleUrls: ['./create-service-category-dialog.component.css']
})
export class CreateServiceCategoryDialogComponent extends BaseCreateDialog<ServiceCategory> {

  constructor(dialogRef: MatDialogRef<CreateServiceCategoryDialogComponent>,
              store: Store<State>) {
    super(dialogRef, store, fromServiceCat.actions, fromServiceCat.selectors)
  }


}
