import { NgModule } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    CalendarComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarModule { }
