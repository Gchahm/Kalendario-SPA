import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Employee, Schedule} from '@api/models';

import {Store} from '@ngrx/store';
import {State} from '@admin/state';

import * as fromEmployees from '@app/admin-employee/state';
import * as fromSchedules from '@app/admin-schedule/state';
import * as fromServices from '@app/admin-services/state';
import * as fromServiceCategories from '@app/admin-services/state/categories';
import {BaseEntityPage} from '@admin/pages/BaseEntityPage';
import {ImageSnippet} from '@shared/components/image-input/image-input.component';
import {ServiceFullModel} from '@app/admin-services/state';

@Component({
  selector: 'admin-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesPageComponent extends BaseEntityPage<Employee> implements OnInit {

  schedules$: Observable<Schedule[]>;
  services$: Observable<ServiceFullModel[]>;
  viewModel$: Observable<fromEmployees.EmployeeModel>;

  constructor(protected store: Store<State>) {
    super(store, fromEmployees.actions, fromEmployees.selectors);
  }

  ngOnInit() {
    this.store.dispatch(fromServices.actions.initializeStore({params: {}}));
    this.store.dispatch(fromServiceCategories.actions.initializeStore({params: {}}));
    this.store.dispatch(fromSchedules.actions.initializeStore({params: {}}));

    this.schedules$ = this.store.select(fromSchedules.selectors.selectAll);
    this.services$ = this.store.select(fromServices.selectors.getServiceFullModels);
    this.viewModel$ = this.store.select(fromEmployees.selectors.getViewModel);
  }

  onPhotoChange(image: ImageSnippet) {
    this.store.dispatch(fromEmployees.actions.requestPhotoUpdate({image}));
  }
}
