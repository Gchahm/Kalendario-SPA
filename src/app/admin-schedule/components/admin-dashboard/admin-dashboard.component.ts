import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuOption} from '../../models/MenuOption';
import {AdminEmployeeService} from '../../services/admin-employee.service';
import {ServiceService} from '../../services/service.service';
import {ScheduleService} from '../../services/schedule.service';
import {ShiftService} from '../../services/shift.service';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../../Store';
import {TOGGLE_LEFT_PANE_BUTTON_VISIBILITY, TOGGLE_LEFT_PANE} from '../../../core/CoreActions';
import {AdminCustomerReduxService} from '../../services/admin-customer-redux.service';
import {SET_COMPANY_NAME} from '../../../company/actions';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  @select((s: IAppState) => s.core.leftPaneOpen) sideOpen;

  options: MenuOption[] = [
    {name: 'Home', link: '/admin/home'},
    {name: 'Employee', link: '/admin/employees'},
    {name: 'Services', link: '/admin/services'},
    {name: 'Shifts', link: '/admin/shifts'},
    {name: 'Schedules', link: '/admin/schedules'},
    {name: 'Customers', link: '/admin/customers'},
    {name: 'Appointments', link: '/admin/appointments'},
  ];

  constructor(private employeeService: AdminEmployeeService,
              private serviceService: ServiceService,
              private scheduleService: ScheduleService,
              private shiftService: ShiftService,
              private customerService: AdminCustomerReduxService,
              private redux: NgRedux<IAppState>) {
  }
  ngOnInit(): void {
    this.employeeService.loadAll();
    this.serviceService.loadAll();
    this.scheduleService.loadAll();
    this.shiftService.loadAll();
    this.customerService.loadAll();
    this.redux.dispatch({type: TOGGLE_LEFT_PANE_BUTTON_VISIBILITY, isVisible: true});
    this.redux.dispatch({type: TOGGLE_LEFT_PANE});
    const user = this.redux.getState().core.user;
    this.redux.dispatch({type: SET_COMPANY_NAME, name: user.company.name});
  }

  ngOnDestroy(): void {
    this.redux.dispatch({type: TOGGLE_LEFT_PANE_BUTTON_VISIBILITY, isVisible: false});
  }

}
