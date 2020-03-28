import {Component} from '@angular/core';
import {CreateEmployeeDialogComponent} from '../../_dialogs/create-employee/create-employee-dialog.component';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../../../Store';
import {BaseListComponent} from '../BaseListComponent';
import {AdminEmployeeService} from '../../../services/admin-employee.service';
import {Employee} from '../../../../core/models/Employee';
import {ImageSnippet} from '../../_details/employee-details/employee-details.component';
import {MatDialog} from '@angular/material/dialog';

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
