import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import * as fromAppointments from '@app/admin-appointments/state';
import {SharedModule} from '@shared/shared.module';
import {AppointmentsEffects} from '@app/admin-appointments/state/appointments.effects';
import {EffectsModule} from '@ngrx/effects';
import {AppointmentDetailsComponent} from '@app/admin-appointments/components/appointment-details/appointment-details.component';
import {AppointmentEventDialogComponent} from '@app/admin-appointments/containers/appointment-event/appointment-event-dialog.component';
import {AppointmentFormComponent} from '@app/admin-appointments/components/appointment-form/appointment-form.component';
import {CreateAppointmentDialogComponent} from '@app/admin-appointments/containers/create-appointment/create-appointment-dialog.component';
import {AppointmentHistoryDetailsComponent} from '@app/admin-appointments/components/appointment-history-details/appointment-history-details.component';
import {SelfAppointmentDetailsComponent} from '@app/admin-appointments/components/self-appointment-details/self-appointment-details.component';
import {SelfAppointmentFormComponent} from '@app/admin-appointments/components/self-appointment-form/self-appointment-form.component';
import {AdminEmployeeModule} from '@app/admin-employee/admin-employee.module';
import {AdminServicesModule} from '@app/admin-services/admin-services.module';
import {AdminCustomersModule} from '@app/admin-customers/admin-customers.module';



@NgModule({
  declarations: [
    AppointmentDetailsComponent,
    SelfAppointmentDetailsComponent,
    AppointmentHistoryDetailsComponent,

    AppointmentFormComponent,
    SelfAppointmentFormComponent,

    AppointmentEventDialogComponent,
    CreateAppointmentDialogComponent,
  ],
  imports: [
    StoreModule.forFeature(fromAppointments.storeName, fromAppointments.reducer),
    EffectsModule.forFeature([
      AppointmentsEffects,
      ]),
    SharedModule,
    AdminEmployeeModule,
    AdminServicesModule,
    AdminCustomersModule,
  ],
})
export class AdminAppointmentsModule { }
