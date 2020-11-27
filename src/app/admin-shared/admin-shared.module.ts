import { NgModule } from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {ModelListContainerComponent} from '@app/admin-shared/components/model-list-container/model-list-container.component';



@NgModule({
  declarations: [
    ModelListContainerComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ModelListContainerComponent
  ]
})
export class AdminSharedModule { }
