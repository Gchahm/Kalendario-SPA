import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {AdminDashboardComponent} from './containers/admin-dashboard/admin-dashboard.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminRoutingModule} from '@admin/admin-routing.module';
import {SchedulingPageComponent} from '@admin/pages/scheduling-page/scheduling-page.component';
import {SchedulingPanelShellComponent} from '@admin/containers/scheduling-panel-shell/scheduling-panel-shell.component';
import {CustomersPageComponent} from '@admin/pages/customers-page/customers-page.component';

import {SchedulePageComponent} from '@admin/pages/schedule-page/schedule-page.component';
import {EmployeesPageComponent} from '@admin/pages/employees-page/employees-page.component';

import {StoreModule} from '@ngrx/store';

import * as fromConfig from '@admin/state/company';
import * as fromPanels from '@admin/state/scheduling';
import * as fromGroups from '@admin/state/groups';
import * as fromRequests from '@admin/state/requests';

import {EffectsModule} from '@ngrx/effects';
import {ServicesPageComponent} from '@admin/pages/services-page/services-page.component';
import {CalendarModule} from '@app/calendar/calendar.module';
import {SchedulingPageToolbarComponent} from './components/scheduling-page-toolbar/scheduling-page-toolbar.component';
import {SchedulingPanelContainerComponent} from './components/scheduling-panel-container/scheduling-panel-container.component';
import {ModelListContainerComponent} from '@admin/components/model-list-container/model-list-container.component';
import {ConfigsEffects} from '@admin/state/company/company.effects';
import {ConfigShellComponent} from './containers/config-shell/config-shell.component';
import {SchedulingEffects} from '@admin/state/scheduling/scheduling.effects';
import {UsersPageComponent} from './pages/users-page/users-page.component';
import {GroupsPageComponent} from './pages/groups-page/groups-page.component';
import {GroupDetailsComponent} from './components/_details/group-details/group-details.component';
import {GroupsEffects} from '@admin/state/groups/groups.effects';
import {GroupFormComponent} from './components/_form/group-form/group-form.component';
import {GroupFormPermissionsComponent} from './components/_form/group-form-permissions/group-form-permissions.component';
import {SchedulingPageContentComponent} from './components/scheduling-page-content/scheduling-page-content.component';
import {CompanyShellComponent} from './containers/company-shell/company-shell.component';
import {RequestsShellComponent} from './containers/requests-shell/requests-shell.component';
import {RequestsEffects} from '@admin/state/requests/requests.effects';
import {RequestDetailsComponent} from './components/_details/request-details/request-details.component';
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
import * as fromScheduling from '@admin/state/scheduling';
import {AdminUsersModule} from '@app/admin-users/admin-users.module';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    HomePageComponent,
    ModelListContainerComponent,

    SchedulingPageComponent,
    SchedulingPanelShellComponent,

    CustomersPageComponent,

    EmployeesPageComponent,

    SchedulePageComponent,

    ServicesPageComponent,

    ConfigRwComponent,
    CompanyRwComponent,


    SchedulingPageToolbarComponent,
    SchedulingPanelContainerComponent,
    ConfigShellComponent,
    UsersPageComponent,
    GroupsPageComponent,
    GroupDetailsComponent,
    GroupFormComponent,
    GroupFormPermissionsComponent,
    SchedulingPageContentComponent,
    CompanyShellComponent,
    RequestsShellComponent,
    RequestDetailsComponent,
    RequestDetailsComponent,
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
    StoreModule.forFeature(fromScheduling.storeName, fromScheduling.reducer),
    StoreModule.forFeature(fromConfig.storeName, fromConfig.reducer),
    StoreModule.forFeature(fromPanels.storeName, fromPanels.reducer),
    StoreModule.forFeature(fromRequests.storeName, fromRequests.reducer),
    EffectsModule.forFeature([
      ConfigsEffects,
      SchedulingEffects,
      GroupsEffects,
      RequestsEffects,
    ]),
    CalendarModule,
    AdminRoutingModule,
    SharedModule,
    AdminCustomersModule,
    AdminAppointmentsModule,
    AdminServicesModule,
    AdminEmployeeModule,
    AdminScheduleModule,
    AdminUsersModule,
  ],

  providers: [],
  exports: [
  ]
})
export class AdminModule {
}
