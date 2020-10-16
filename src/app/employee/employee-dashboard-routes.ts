import {DashBoardRoute} from '@shared/components/dashboard-container/dashboard-container.component';
import {EmployeeHomeComponent} from '@app/employee/components/employee-home/employee-home.component';
import {EmployeeSchedulePageComponent} from '@app/employee/pages/employee-schedule-page/employee-schedule-page.component';
import {IsEmployeeGuard} from '@app/employee/guards/is-employee.guard';

export const employeeDashboardRoutes: DashBoardRoute[] = [
  {
    path: 'home',
    icon: 'home',
    component: EmployeeHomeComponent,
    canActivate: [IsEmployeeGuard],

  },
  {
    path: 'schedule',
    icon: 'book',
    component: EmployeeSchedulePageComponent,
    canActivate: [IsEmployeeGuard],
  },
  {
    path: '',
    icon: '',
    component: EmployeeSchedulePageComponent,
    canActivate: [IsEmployeeGuard],

  },

];
