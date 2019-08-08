import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarEventComponent } from './components/calendar-event/calendar-event.component';



@NgModule({
  declarations: [
    CalendarComponent,
    CalendarEventComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarModule { }
