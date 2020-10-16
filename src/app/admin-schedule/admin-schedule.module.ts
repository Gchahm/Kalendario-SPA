import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SchedulesEffects} from '@app/admin-schedule/state/schedules.effects';
import {ScheduleDetailsComponent} from '@app/admin-schedule/components/schedule-details/schedule-details.component';
import {ScheduleFormComponent} from '@app/admin-schedule/components/schedule-form/schedule-form.component';
import {CreateScheduleDialogComponent} from '@app/admin-schedule/containers/create-schedule/create-schedule-dialog.component';
import {SharedModule} from '@shared/shared.module';
import * as fromSchedules from '@app/admin-schedule/state';


@NgModule({
  declarations: [
    ScheduleDetailsComponent,
    ScheduleFormComponent,
    CreateScheduleDialogComponent,
  ],
  imports: [
    StoreModule.forFeature(fromSchedules.storeName, fromSchedules.reducer),
    EffectsModule.forFeature([
      SchedulesEffects,
    ]),
    SharedModule
    ],
  exports: [
    ScheduleDetailsComponent,
    ScheduleFormComponent,
  ]
})
export class AdminScheduleModule { }
