import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import * as fromCompany from './company.reducer';
import {Service, IEmployee, IAppointment, Appointment} from '@api/models';
import {SlotsParams} from '@api/clients';
import {Moment} from 'moment';
import * as moment from 'moment';

export const storeName = 'company';
export * from './company.actions';
export * from './company.reducer';


export const getCompanyFeature = createFeatureSelector<fromCompany.State>(storeName);


export const getApiError = createSelector(
  getCompanyFeature,
  state => state.apiError
);


export const getCheckoutMode = createSelector(
  getCompanyFeature,
  state => state.checkoutMode
);


export const getCompany = createSelector(
  getCompanyFeature,
  state => state.company
);


export const getServices = createSelector(
  getCompany,
  company => !company ? null : company.services
);


export const getServiceCategories = createSelector(
  getCompany,
  company => !company ? null : company.serviceCategories
);


export const getCurrentCategoryId = createSelector(
  getCompanyFeature,
  state => state.currentCategoryId
);


export const getFilteredServices = createSelector(
  getServices,
  getCurrentCategoryId,
  (services, id) => !services ? [] : services.filter(s => s.category === id)
);


export const getEmployees = createSelector(
  getCompany,
  company => !company ? [] : company.employees
);


export interface CompanyEmployeeModel {
  employee: IEmployee;
  services: Service[];
}


export const getCompanyEmployeeModels: MemoizedSelector<object, CompanyEmployeeModel[]> = createSelector(
  getEmployees,
  getServices,
  (emps, servs) =>
    emps.map(employee => ({
      employee,
      services: servs.filter(s => employee.services.includes(s.id))
    }))
);


export const getCompanyName = createSelector(
  getCompany,
  company => !company ? '' : company.name
);


export const getCurrentDate = createSelector(
  getCompanyFeature,
  state => state.date
);


export const getCurrentMomentDate = createSelector(
  getCurrentDate,
  date => moment.utc(date)
);


export const getCurrentEmployeeId = createSelector(
  getCompanyFeature,
  state => state.currentEmployeeId
);


export const getCurrentEmployee = createSelector(
  getEmployees,
  getCurrentEmployeeId,
  (employees, id) =>
    employees === null || id === null || id === 0 ? null : employees.find(emp => emp.id === id)
);


export const getCurrentEmployeeServices = createSelector(
  getCurrentEmployee,
  getServices,
  (employee, services) => services.filter(s => employee.services.includes(s.id))
);


export const getSearch = createSelector(
  getCompanyFeature,
  state => state.serviceSearch
);


export const getCurrentEmployeeServicesFiltered = createSelector(
  getCurrentEmployeeServices,
  getSearch,
  (services, search) => services.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
);


export const getCurrentServiceId: MemoizedSelector<object, number> = createSelector(
  getCompanyFeature,
  state => state.currentServiceId
);


export const getCurrentService: MemoizedSelector<object, Service> = createSelector(
  getServices,
  getCurrentServiceId,
  (services, serviceId) =>
    serviceId === null ? null : services.find(s => s.id === serviceId)
);


export const getIsLoadingSlots = createSelector(
  getCompanyFeature,
  state => state.loadingSlots
);


export const getDisableDateInput = createSelector(
  getCompanyFeature,
  state => state.disableDateInput
);


export const getEmpService = createSelector(
  getCurrentEmployeeId,
  getCurrentServiceId,
  (employee, service) => !service ? null : !employee ? {service} : {service, employee}
);


export const getSlotsParams: MemoizedSelector<object, SlotsParams> = createSelector(
  getEmpService,
  getCurrentDate,
  getDisableDateInput,
  (params, date, disabled) => !params ? null : !date ? null : {
    ...params,
    start: moment.utc(date).startOf('day'),
    end: disabled ? moment.utc(date).endOf('day') : moment.utc(date).add(1, 'd').endOf('day')
  }
);


export interface ServiceSlot {
  id: number;
  title: string;
  start: Moment;
  end: Moment;
}


export const getServiceSlots: MemoizedSelector<object, ServiceSlot[]> = createSelector(
  getCompanyFeature,
  state => state.slots
);


export const getRequest: MemoizedSelector<object, IAppointment> = createSelector(
  getCurrentEmployee,
  getCurrentService,
  getCurrentMomentDate,
  (employee, service, date) => {
    const appointment = Appointment.fromJS();
    appointment.service = service;
    appointment.employee = employee;
    appointment.start = date;
    return appointment;
  }
);


export const getPreBookMessage = createSelector(
  getCompany,
  company => company.config.preBookWarn
);


export const getPostBookMessage = createSelector(
  getCompany,
  company => company.config.postBookMessage
);


export const getCurrentRequest = createSelector(
  getCompanyFeature,
  state => state.currentRequest
);


export const getPaymentDetails = createSelector(
  getCompanyFeature,
  state => state.paymentDetails
);


export const getCurrentRequestItems = createSelector(
  getCurrentRequest,
  request => request.items
);


export const getCurrentSlotId = createSelector(
  getCompanyFeature,
  items => items.currentSlotId
);


export const getCurrentSlot = createSelector(
  getServiceSlots,
  getCurrentSlotId,
  (slots, current) => slots.find(s => s.id === current)
);


export const getAddAppointmentWriteModel = createSelector(
  getEmpService,
  getCurrentSlot,
  (es, slot) => !es ? null : !slot ? null : {...es, start: slot.start}
);
