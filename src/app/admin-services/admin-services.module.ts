import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import * as fromServices from '@app/admin-services/state';
import * as fromServiceCat from '@app/admin-services/state/categories';
import {EffectsModule} from '@ngrx/effects';
import {ServicesEffects} from '@app/admin-services/state/services.effects';
import {ServiceCategoriesEffects} from '@app/admin-services/state/categories/serviceCategories.effects';
import {ServiceCategoryInputComponent} from '@admin/containers/_input/service-category-input/service-category-input.component';
import {ServiceCategoryFormComponent} from '@app/admin-services/components/service-category-form/service-category-form.component';
import {SharedModule} from '@shared/shared.module';
import {CreateServiceDialogComponent} from '@app/admin-services/containers/create-service/create-service-dialog.component';
import {CreateServiceCategoryDialogComponent} from '@app/admin-services/containers/create-service-category/create-service-category-dialog.component';
import { ServiceRwComponent } from './components/service-rw/service-rw.component';
import { ServiceViewShellComponent } from './containers/service-view-shell/service-view-shell.component';


@NgModule({
  declarations: [
    ServiceCategoryFormComponent,
    ServiceCategoryInputComponent,

    CreateServiceCategoryDialogComponent,
    CreateServiceDialogComponent,
    ServiceRwComponent,
    ServiceViewShellComponent,

  ],
  imports: [
    StoreModule.forFeature(fromServices.storeName, fromServices.reducer),
    StoreModule.forFeature(fromServiceCat.storeName, fromServiceCat.reducer),
    EffectsModule.forFeature([
      ServicesEffects,
      ServiceCategoriesEffects,
    ]),
    SharedModule
  ],
    exports: [
        ServiceViewShellComponent,
    ]
})
export class AdminServicesModule {
}
