import {Component, OnInit} from '@angular/core';
import {ImageSnippet} from '@shared/components/image-input/image-input.component';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import {ViewShellComponent} from '@shared/common/ViewShellComponent';
import {IEmployee, ISchedule} from '@api/models';
import * as fromEmployees from '@app/admin-employee/state';
import * as fromServices from '@app/admin-services/state';
import * as fromServiceCategories from '@app/admin-services/state/categories';
import * as fromSchedules from '@app/admin-schedule/state';

@Component({
  selector: 'admin-employee-view-shell',
  templateUrl: './employee-view-shell.component.html',
  styleUrls: ['./employee-view-shell.component.scss']
})
export class EmployeeViewShellComponent extends ViewShellComponent<IEmployee> implements OnInit {
  fullModel$: Observable<fromEmployees.EmployeeViewModel>;
  services$: Observable<fromServices.ServiceFullModel[]>;
  schedules$: Observable<ISchedule[]>;

  constructor(protected store: Store<State>) {
    super(store, fromEmployees.actions, fromEmployees.selectors);
    this.fullModel$ = this.store.select(fromEmployees.selectors.getViewModel);
    this.services$ = this.store.select(fromServices.selectors.getServiceFullModels);
    this.schedules$  = this.store.select(fromSchedules.selectors.selectAll);
  }

  onPhotoChange(image: ImageSnippet) {
    this.store.dispatch(fromEmployees.actions.requestPhotoUpdate({image}));
  }

  ngOnInit() {
    this.store.dispatch(fromServices.actions.initializeStore({params: {}}));
    this.store.dispatch(fromServiceCategories.actions.initializeStore({params: {}}));
    this.store.dispatch(fromSchedules.actions.initializeStore({params: {}}));
  }
}

