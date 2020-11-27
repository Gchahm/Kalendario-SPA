import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SchedulesEffects} from '@app/admin-schedule/state/schedules.effects';
import {ScheduleDetailsComponent} from '@app/admin-schedule/components/schedule-details/schedule-details.component';
import {ScheduleFormComponent} from '@app/admin-schedule/components/schedule-form/schedule-form.component';
import * as fromSchedules from '@app/admin-schedule/state';
import { ShiftFrameComponent } from './components/shift-frame/shift-frame.component';
import {SchedulePageComponent} from '@app/admin-schedule/pages/schedule-page/schedule-page.component';
import {AdminSharedModule} from '@app/admin-shared/admin-shared.module';


@NgModule({
  declarations: [
    ScheduleDetailsComponent,
    ScheduleFormComponent,
    ShiftFrameComponent,
    SchedulePageComponent,
  ],
  imports: [
    AdminSharedModule,
    StoreModule.forFeature(fromSchedules.storeName, fromSchedules.reducer),
    EffectsModule.forFeature([
      SchedulesEffects,
    ])
    ],
  exports: [
    ScheduleDetailsComponent,
  ]
})
export class AdminScheduleModule { }
