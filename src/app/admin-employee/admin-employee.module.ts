import { NgModule } from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {EmployeesEffects} from '@app/admin-employee/state/employees.effects';
import {StoreModule} from '@ngrx/store';
import * as fromEmployees from '@app/admin-employee/state';
import {EmployeeFormServicesComponent} from '@app/admin-employee/components/employee-form-services/employee-form-services.component';
import {AdminScheduleModule} from '@app/admin-schedule/admin-schedule.module';
import { EmployeeRwComponent } from './components/employee-rw/employee-rw.component';
import {EmployeeViewShellComponent} from '@app/admin-employee/containers/employee-view-shell/employee-view-shell.component';
import {EmployeesPageComponent} from '@app/admin-employee/pages/employees-page/employees-page.component';
import {AdminSharedModule} from '@app/admin-shared/admin-shared.module';


@NgModule({
  declarations: [
    EmployeeViewShellComponent,
    EmployeeFormServicesComponent,
    EmployeeRwComponent,
    EmployeesPageComponent,
  ],
  imports: [
    AdminScheduleModule,
    StoreModule.forFeature(fromEmployees.storeName, fromEmployees.reducer),
    EffectsModule.forFeature([
      EmployeesEffects,
    ]),
    AdminSharedModule,
    AdminScheduleModule
  ],
  exports: [
    EmployeesPageComponent,
  ]
})
export class AdminEmployeeModule { }
