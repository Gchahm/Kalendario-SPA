import { NgModule } from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {ModelListContainerComponent} from '@app/admin-shared/components/model-list-container/model-list-container.component';
import { ModelListMobileContainerComponent } from './components/model-list-mobile-container/model-list-mobile-container.component';
import { ModelListItemsComponent } from './components/model-list-items/model-list-items.component';
import { ModelListDetailsComponent } from './components/model-list-details/model-list-details.component';



@NgModule({
  declarations: [
    ModelListContainerComponent,
    ModelListMobileContainerComponent,
    ModelListItemsComponent,
    ModelListDetailsComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SharedModule,
    ModelListContainerComponent,
  ]
})
export class AdminSharedModule { }
