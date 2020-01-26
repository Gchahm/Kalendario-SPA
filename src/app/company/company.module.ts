import { NgModule } from '@angular/core';
import { CompanyComponent } from './components/company/company.component';
import {EmployeeListPageComponent} from './components/employee-list-page/employee-list-page.component';
import {EmployeeDetailPageComponent} from './components/employee-detail-page/employee-detail-page.component';
import {SharedModule} from '../shared/shared.module';
import {CalendarModule} from '../calendar/calendar.module';
import {CompanyRoutingModule} from './company-routing.module';
import {BookAppointmentPageComponent} from './components/book-appointment-page/book-appointment-page.component';



@NgModule({
  declarations: [
    CompanyComponent,
    EmployeeListPageComponent,
    EmployeeDetailPageComponent,
    BookAppointmentPageComponent,
  ],
  imports: [
    CompanyRoutingModule,
    SharedModule,
    CalendarModule,
  ]
})
export class CompanyModule { }
