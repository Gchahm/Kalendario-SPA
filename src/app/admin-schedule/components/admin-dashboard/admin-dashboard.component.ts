import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuOption} from '../../models/MenuOption';
import {AdminEmployeeService} from '../../services/admin-employee.service';
import {ServiceService} from '../../services/service.service';
import {ScheduleService} from '../../services/schedule.service';
import {ShiftService} from '../../services/shift.service';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../../Store';
import {TOGGLE_LEFT_PANE_BUTTON_VISIBILITY, TOGGLE_LEFT_PANE} from '../../../core/CoreActions';
import {SET_COMPANY_NAME} from '../../../company/actions';
import {forkJoin} from 'rxjs';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  @select((s: IAppState) => s.core.leftPaneOpen) sideOpen;
  @select((s: IAppState) => s.core.isMobileView) isMobile;

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
              private customerService: CustomerService,
              private redux: NgRedux<IAppState>) {
  }

  ngOnInit(): void {
    forkJoin(
      this.employeeService.get(),
      this.serviceService.get(),
      this.scheduleService.get(),
      this.shiftService.get(),
      this.customerService.get()
    ).toPromise();

    this.redux.dispatch({type: TOGGLE_LEFT_PANE_BUTTON_VISIBILITY, isVisible: true});
    this.redux.dispatch({type: TOGGLE_LEFT_PANE});
    const user = this.redux.getState().core.user;
    this.redux.dispatch({type: SET_COMPANY_NAME, name: user.company.name});
  }

  ngOnDestroy(): void {
    this.redux.dispatch({type: TOGGLE_LEFT_PANE_BUTTON_VISIBILITY, isVisible: false});
  }
}
