import { NgModule } from '@angular/core';
import {AppointmentCardComponent} from './components/appointment-card/appointment-card.component';
import {SharedModule} from '../shared/shared.module';
import {BookAppointmentPageComponent} from './components/book-appointment-page/book-appointment-page.component';
import {EmployeeListPageComponent} from './components/employee-list-page/employee-list-page.component';
import {EmployeeDetailPageComponent} from './components/employee-detail-page/employee-detail-page.component';
import {SlotEventComponent} from './components/slot-event/slot-event.component';
import {CalendarModule} from '../calendar/calendar.module';
import {CustomerRoutingModule} from './customer-routing.module';
import {DashboardPageComponent} from './components/dashboard-page/dashboard-page.component';



@NgModule({
  declarations: [
    DashboardPageComponent,
    BookAppointmentPageComponent,
    AppointmentCardComponent,
    EmployeeListPageComponent,
    EmployeeDetailPageComponent,
    SlotEventComponent,
  ],
  imports: [
    CustomerRoutingModule,
    SharedModule,
    CalendarModule,
  ]
})
export class CustomerModule { }
