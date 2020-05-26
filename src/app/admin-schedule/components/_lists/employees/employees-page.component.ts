import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '@app/Store';
import {Employee} from '@core/models/Employee';
import {AdminEmployeeService} from '@admin-schedule/services/admin-employee.service';
import {BaseListComponent} from '@admin-schedule/components/_lists/BaseListComponent';
import {CreateEmployeeDialogComponent} from '@admin-schedule/components/_dialogs/create-employee/create-employee-dialog.component';
import {ImageSnippet} from '@admin-schedule/components/_details/employee-details/employee-details.component';

@Component({
  selector: 'admin-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss']
})
export class EmployeesPageComponent extends BaseListComponent<Employee> {

  @select((store: IAppState) => store.admin.employees) modelList$;

  constructor(service: AdminEmployeeService,
              dialog: MatDialog,
              redux: NgRedux<IAppState>) {
    super(service, dialog, CreateEmployeeDialogComponent, redux);
  }

  onPhotoChange(event: ImageSnippet) {
    const empService = this.modelService as AdminEmployeeService;
    empService.uploadProfilePicture(event.id, event.file);

  }
}
