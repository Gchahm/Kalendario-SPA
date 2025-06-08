import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {IEmployee, PanelManager, SchedulingPanel} from '@api/models';
import {combineLatest, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';

import {filter, map, takeWhile} from 'rxjs/operators';
import * as fromAppointments from '@app/admin-appointments/state';
import * as fromScheduling from '@app/admin-scheduling/state';
import * as fromEmployees from '@app/admin-employee/state';
import * as fromSchedules from '@app/admin-schedule/state';
import * as fromRequests from '@app/admin-scheduling/state/requests/';
import {BaseEntityPage} from '@admin/pages/BaseEntityPage';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'admin-scheduling-page',
  templateUrl: './scheduling-page.component.html',
  styleUrls: ['./scheduling-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SchedulingPageComponent extends BaseEntityPage<SchedulingPanel> implements OnInit, OnDestroy {

  toolbarEmployees$: Observable<fromScheduling.ToolbarEmployee[]>;
  selectedEmployees$: Observable<IEmployee[]>;
  requestsCount$: Observable<number>;
  date$: Observable<Moment>;
  isLoadingAppointments$: Observable<boolean>;

  isActive = true;
  showRequests = false;

  constructor(protected store: Store<State>,
              private route: ActivatedRoute,
              private router: Router) {
    super(store, fromScheduling.actions, fromScheduling.selectors);
  }

  ngOnInit() {
    this.loadDateFromQueryParams();

    this.store.dispatch(fromEmployees.actions.initializeStore({params: {}}));
    this.store.dispatch(fromSchedules.actions.initializeStore({params: {}}));
    this.toolbarEmployees$ = this.store.select(fromScheduling.selectors.getToolBarEmployees);
    this.selectedEmployees$ = this.store.select(fromScheduling.selectors.getSelectedEmployees);
    this.requestsCount$ = this.store.select(fromRequests.selectors.selectTotal);
    this.date$ = this.store.select(fromScheduling.selectors.getDate);
    this.isLoadingAppointments$ = this.store.select(fromAppointments.selectors.getIsLoadingEntities);

    this.observeStoreAndReloadAppointments();
  }

  private loadDateFromQueryParams() {
    const routeSnapShot = this.route.snapshot.queryParamMap;
    let date: Moment;
    if (routeSnapShot.has('date')) {
      date = moment(routeSnapShot.get('date')).utc();
    }
    if (!date || !date.isValid()) {
      date = moment().utc().startOf('day');
    }
    this.updateDate(date);
  }

  observeStoreAndReloadAppointments() {
    combineLatest([this.selectedEmployees$, this.date$]).pipe(
      takeWhile(res => this.isActive),
      map(([employees, date]) => ({employees: employees.map(e => e.id), date})),
      filter(({employees, date}) => employees.length > 0),
    ).subscribe(({employees, date}) => {
      this.loadAppointments(employees, date.clone().startOf('day'), date.clone().endOf('day'));
    });
  }

  ngOnDestroy() {
    this.isActive = false;
  }

  loadAppointments(employees: number[], fromDate: Moment, toDate: Moment) {
    this.store.dispatch(fromAppointments.actions.requestEntities({params: {employees, from_date: fromDate, to_date: toDate}}));
  }

  removeEmployee(panel: SchedulingPanel, employee: IEmployee) {
    this.updateModel(PanelManager.removeEmployee(panel, employee.id));
  }

  updateDate(date: Moment) {
    this.store.dispatch(fromScheduling.actions.updateDate({date}));
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {date: date.toISOString()},
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

}
