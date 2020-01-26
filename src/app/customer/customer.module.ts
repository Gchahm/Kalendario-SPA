import { NgModule } from '@angular/core';
import {AppointmentCardComponent} from './components/appointment-card/appointment-card.component';
import {DashboardPageComponent} from './components/dashboard-page/dashboard-page.component';
import {CustomerRoutingModule} from './customer-routing.module';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    DashboardPageComponent,
    AppointmentCardComponent,
  ],
  imports: [
    CustomerRoutingModule,
    SharedModule,
  ]
})
export class CustomerModule { }
