import { NgModule } from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {EmployeesEffects} from '@app/admin-employee/state/employees.effects';
import {StoreModule} from '@ngrx/store';
import * as fromEmployees from '@app/admin-employee/state';
import {EmployeeFormServicesComponent} from '@app/admin-employee/components/employee-form-services/employee-form-services.component';
import {EmployeeFormComponent} from '@app/admin-employee/components/employee-form/employee-form.component';
import {CreateEmployeeDialogComponent} from '@app/admin-employee/containers/create-employee/create-employee-dialog.component';
import {EmployeeDetailsComponent} from '@app/admin-employee/components/employee-details/employee-details.component';
import {SharedModule} from '@shared/shared.module';
import {AdminScheduleModule} from '@app/admin-schedule/admin-schedule.module';


@NgModule({
  declarations: [
    EmployeeDetailsComponent,
    EmployeeFormComponent,
    EmployeeFormServicesComponent,
    CreateEmployeeDialogComponent,
  ],
  imports: [
    StoreModule.forFeature(fromEmployees.storeName, fromEmployees.reducer),
    EffectsModule.forFeature([
      EmployeesEffects,
    ]),
    SharedModule,
    AdminScheduleModule
  ],
  exports: [
    EmployeeDetailsComponent,
    EmployeeFormComponent,
  ]
})
export class AdminEmployeeModule { }
