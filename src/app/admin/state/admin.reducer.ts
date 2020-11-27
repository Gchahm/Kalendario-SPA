import * as fromAppointments from '@app/admin-appointments/state';
import * as fromCustomers from '@app/admin-customers/state';
import * as fromEmployees from '@app/admin-employee/state';
import * as fromSchedules from '@app/admin-schedule/state';
import * as fromScheduling from '@app/admin-scheduling/state';
import * as fromRequests from '@app/admin-scheduling/state/requests';
import * as fromServices from '@app/admin-services/state';
import * as fromServiceCat from '@app/admin-services/state/categories';
import * as fromApp from '@app/state';
import {storeName} from '@app/admin-employee/state/employees.actions';

export interface State extends fromApp.State {
  [fromAppointments.storeName]: fromAppointments.State;
  [fromCustomers.storeName]: fromCustomers.State;
  [storeName]: fromEmployees.State;
  [fromSchedules.storeName]: fromSchedules.State;
  [fromScheduling.storeName]: fromScheduling.State;
  [fromRequests.storeName]: fromRequests.State;
  [fromServices.storeName]: fromServices.State;
  [fromServiceCat.storeName]: fromServiceCat.State;
}


