import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {AdminDashboardComponent} from './containers/admin-dashboard/admin-dashboard.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminRoutingModule} from '@admin/admin-routing.module';

import {StoreModule} from '@ngrx/store';
import * as fromConfig from '@admin/state/company';
import * as fromGroups from '@admin/state/groups';

import {EffectsModule} from '@ngrx/effects';
import {ConfigsEffects} from '@admin/state/company/company.effects';
import {ConfigShellComponent} from './containers/config-shell/config-shell.component';
import {UsersPageComponent} from '../admin-users/pages/users-page/users-page.component';
import {GroupsPageComponent} from './pages/groups-page/groups-page.component';
import {GroupDetailsComponent} from './components/_details/group-details/group-details.component';
import {GroupsEffects} from '@admin/state/groups/groups.effects';
import {GroupFormComponent} from './components/_form/group-form/group-form.component';
import {GroupFormPermissionsComponent} from './components/_form/group-form-permissions/group-form-permissions.component';
import {CompanyShellComponent} from './containers/company-shell/company-shell.component';
import {CompanyStripeDetailsComponent} from './components/_details/company-stripe-details/company-stripe-details.component';
import {
  CompanyPayPreferencesDetailsComponent
} from '@admin/components/_details/company-pay-preferences-details/company-pay-preferences-details.component';
import {CompanyRwComponent} from '@admin/components/_rw/company-rw/company-rw.component';
import {ConfigRwComponent} from '@admin/components/_rw/config-rw/config-rw.component';
import {StripeDetailsShellComponent} from '@admin/containers/stripe-details-shell/stripe-details-shell.component';
import { CompanyUiRwComponent } from './components/_rw/company-ui-rw/company-ui-rw.component';
import { FieldContainerComponent } from './components/_fields/field-container/field-container.component';
import { ToggleFieldComponent } from './components/_fields/toggle-field/toggle-field.component';
import {AdminCustomersModule} from '@app/admin-customers/admin-customers.module';
import {AdminAppointmentsModule} from '@app/admin-appointments/admin-appointments.module';
import {AdminServicesModule} from '@app/admin-services/admin-services.module';
import {AdminEmployeeModule} from '@app/admin-employee/admin-employee.module';
import {AdminScheduleModule} from '@app/admin-schedule/admin-schedule.module';
import {AdminUsersModule} from '@app/admin-users/admin-users.module';
import {AdminSchedulingModule} from '@app/admin-scheduling/admin-scheduling.module';
import {AdminSharedModule} from '@app/admin-shared/admin-shared.module';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    HomePageComponent,
    ConfigRwComponent,
    CompanyRwComponent,
    ConfigShellComponent,
    GroupsPageComponent,
    GroupDetailsComponent,
    GroupFormComponent,
    GroupFormPermissionsComponent,
    CompanyShellComponent,
    StripeDetailsShellComponent,
    CompanyStripeDetailsComponent,
    CompanyStripeDetailsComponent,
    CompanyPayPreferencesDetailsComponent,
    CompanyUiRwComponent,
    FieldContainerComponent,
    ToggleFieldComponent,
  ],
  imports: [
    StoreModule.forFeature(fromGroups.storeName, fromGroups.reducer),
    StoreModule.forFeature(fromConfig.storeName, fromConfig.reducer),
    EffectsModule.forFeature([
      ConfigsEffects,
      GroupsEffects,
    ]),
    AdminRoutingModule,
    SharedModule,
    AdminCustomersModule,
    AdminAppointmentsModule,
    AdminServicesModule,
    AdminEmployeeModule,
    AdminScheduleModule,
    AdminUsersModule,
    AdminSchedulingModule,
    AdminSharedModule
  ],

  providers: [],
  exports: [
  ]
})
export class AdminModule {
}
