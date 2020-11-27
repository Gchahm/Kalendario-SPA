import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RequestsEffects} from '@app/admin-scheduling/state/requests/requests.effects';
import {SchedulingEffects} from '@app/admin-scheduling/state/scheduling.effects';
import {SchedulingPageContentComponent} from '@app/admin-scheduling/components/scheduling-page-content/scheduling-page-content.component';
import {SchedulingPageToolbarComponent} from '@app/admin-scheduling/components/scheduling-page-toolbar/scheduling-page-toolbar.component';
import {SchedulingPanelContainerComponent} from '@app/admin-scheduling/components/scheduling-panel-container/scheduling-panel-container.component';

import * as fromScheduling from '@app/admin-scheduling/state';
import * as fromRequests from '@app/admin-scheduling/state/requests';
import {SchedulePageComponent} from '@admin/pages/schedule-page/schedule-page.component';
import {SharedModule} from '@shared/shared.module';
import {SchedulingPageComponent} from '@app/admin-scheduling/pages/scheduling-page/scheduling-page.component';
import {SchedulingPanelShellComponent} from '@app/admin-scheduling/containers/scheduling-panel-shell/scheduling-panel-shell.component';
import {CalendarComponent} from '@app/admin-scheduling/components/calendar/calendar.component';
import {CalendarHoursComponent} from '@app/admin-scheduling/components/calendar-hours/calendar-hours.component';
import {CalendarLineComponent} from '@app/admin-scheduling/components/calendar-line/calendar-line.component';
import {RequestsShellComponent} from '@app/admin-scheduling/containers/requests-shell/requests-shell.component';
import {RequestDetailsComponent} from '@app/admin-scheduling/components/request-details/request-details.component';
import {AdminSharedModule} from '@app/admin-shared/admin-shared.module';

@NgModule({
  declarations: [
    RequestsShellComponent,
    RequestDetailsComponent,
    SchedulingPageComponent,
    SchedulingPanelShellComponent,
    SchedulingPageContentComponent,
    SchedulingPageToolbarComponent,
    SchedulingPanelContainerComponent,
    CalendarComponent,
    CalendarHoursComponent,
    CalendarLineComponent,
  ],
  imports: [
    AdminSharedModule,
    // AdminScheduleModule,
    StoreModule.forFeature(fromScheduling.storeName, fromScheduling.reducer),
    StoreModule.forFeature(fromRequests.storeName, fromRequests.reducer),
    EffectsModule.forFeature([
      SchedulingEffects,
      RequestsEffects,
    ]),
  ],
  exports: [
    SchedulingPageComponent,
  ]
})
export class AdminSchedulingModule { }
