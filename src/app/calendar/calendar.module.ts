import {NgModule} from '@angular/core';
import {CalendarComponent} from './components/calendar/calendar.component';
import {SharedModule} from '@shared/shared.module';
import { CalendarHoursComponent } from './components/calendar-hours/calendar-hours.component';
import { CalendarLineComponent } from './components/calendar-line/calendar-line.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarHoursComponent,
    CalendarLineComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CalendarComponent,
    CalendarHoursComponent,
  ]
})
export class CalendarModule {
}
