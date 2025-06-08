import {ChangeDetectionStrategy, Component} from '@angular/core';
import {IEmployee} from '@api/models';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import * as fromEmployees from '@app/admin-employee/state';
import {BaseEntityPage} from '@admin/pages/BaseEntityPage';

@Component({
  selector: 'admin-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesPageComponent extends BaseEntityPage<IEmployee> {
  constructor(protected store: Store<State>) {
    super(store, fromEmployees.actions, fromEmployees.selectors);
  }
}
