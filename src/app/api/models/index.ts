export {Appointment, IAppointment, IAppointmentWriteModel, AppointmentAdapter} from './Appointment';
export {Schedule, IScheduleWriteModel, ScheduleAdapter} from './Schedule';
export {Shift, IShiftWriteModel, ShiftAdapter, TimeFrame} from './Shift';
export {CompanyConfig, IConfigWriteModel, ConfigAdapter} from './CompanyConfig';
export {Company, ICompanyWriteModel, CompanyAdapter} from './Company';
export {CompanyStripeDetails, CompanyStripeDetailsAdapter} from './CompanyStripeDetails';
export {CompanyDetailsResult, CompanyDetailsResultAdapter} from './CompanyDetailsResult';
export {Employee, EmployeeWriteModel, EmployeeAdapter} from './Employee';
export {EmployeeDashboardModel, EmployeeDashboardAdapter} from './EmployeeDashboardModel';
export {Customer, ICustomerWriteModel, CustomerAdapter} from './Customer';
export {Service, IServiceWriteModel, ServiceAdapter} from './Service';
export {SchedulingPanel, ISchedulingPanelWriteModel, SchedulingPanelAdapter, PanelManager} from './SchedulingPanel';
export {ServiceCategory, IServiceCategoryWriteModel, ServiceCategoryAdapter} from './ServiceCategory';
export {Group, IGroupWriteModel, GroupAdapter} from './Group';
export {Permission, IPermissionWriteModel, PermissionAdapter} from './Permission';
export {User, IUser, IUserWriteModel, UserAdapter} from './IUser';
export {Slot, SlotAdapter} from './Slot';
export {RequestModel, RequestAdapter, AddAppointmentWriteModel} from './RequestModel';
export {IReadModel} from './IReadModel';


export type Partial<T> = {
  [P in keyof T]?: T[P];
};
