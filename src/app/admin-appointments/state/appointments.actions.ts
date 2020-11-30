import {BaseEntityActions, createActions} from '@shared/state/base/actions';
import {Appointment, Employee} from '@api/models';
import {ActionCreator, createAction, props} from '@ngrx/store';
import {TypedAction} from '@ngrx/store/src/models';
import {Moment} from 'moment';
import {ApiError} from '@api/Errors';


export const storeName = 'adminAppointments';


interface AppointmentActions extends BaseEntityActions<Appointment> {
  requestSelfAppointmentUpdate: ActionCreator<string, (props: { entity: Appointment }) =>
    ({ entity: Appointment } & TypedAction<string>)>;

  requestSelfAppointmentCreate: ActionCreator<string, (props: { entity: Appointment }) =>
    ({ entity: Appointment } & TypedAction<string>)>;

  requestAppointmentHistory: ActionCreator<string, (props: {}) =>
    ({} & TypedAction<string>)>;

  openCreateAppointmentDialog: ActionCreator<string, (props: { date: Moment, employee: Employee, employeeMode: boolean }) =>
    ({ date: Moment, employee: Employee, employeeMode: boolean } & TypedAction<string>)>;

  openCreateSelfAppointmentDialog: ActionCreator<string, (props: { date: Moment, employee: Employee }) =>
    ({ date: Moment, employee: Employee } & TypedAction<string>)>;

  openAppointmentEventDialog: ActionCreator<string, (props: { id: number, employeeMode: boolean }) =>
    ({ id: number, employeeMode: boolean } & TypedAction<string>)>;

  initializeCurrentAppointment: ActionCreator<string, (props: { date: Moment, employee: Employee }) =>
    ({ date: Moment, employee: Employee } & TypedAction<string>)>;

  initializeCurrentSelfAppointment: ActionCreator<string, (props: { date: Moment, employee: Employee }) =>
    ({ date: Moment, employee: Employee } & TypedAction<string>)>;

  setAppointmentHistory: ActionCreator<string, (props: { appointments: Appointment[] }) =>
    ({ appointments: Appointment[] } & TypedAction<string>)>;

  setCurrentDate: ActionCreator<string, (props: { date: Moment }) =>
    ({ date: Moment } & TypedAction<string>)>;

  setHistoryApiError: ActionCreator<string, (props: { error: ApiError }) =>
    ({ error: ApiError } & TypedAction<string>)>;
}


export const actions: AppointmentActions = {
  ...createActions<Appointment>(storeName),
  requestSelfAppointmentUpdate: createAction(`[${storeName}] Request Self Appointment Update`,
    props<{ entity: Appointment }>()),

  requestSelfAppointmentCreate: createAction(`[${storeName}] Request Self Appointment Create`,
    props<{ entity: Appointment }>()),

  requestAppointmentHistory: createAction(`[${storeName}] Request Appointment History`,
    props<{}>()),

  openCreateAppointmentDialog: createAction(`[${storeName}] Open Create Appointment`,
    props<{ date: Moment, employee: Employee, employeeMode: boolean }>()),

  openCreateSelfAppointmentDialog: createAction(`[${storeName}] Open Create Self Appointment`,
    props<{ date: Moment, employee: Employee }>()),

  openAppointmentEventDialog: createAction(`[${storeName}] Open Appointment Event Dialog`,
    props<{ id: number, employeeMode: boolean }>()),


  initializeCurrentAppointment: createAction(`[${storeName}] Initialize Appointment`,
    props<{ date: Moment, employee: Employee }>()),

  initializeCurrentSelfAppointment: createAction(`[${storeName}] Initialize Self appointment`,
    props<{ date: Moment, employee: Employee }>()),

  setAppointmentHistory: createAction(`[${storeName}] Set Appointment History`,
    props<{ appointments: Appointment[] }>()),

  setCurrentDate: createAction(`[${storeName}] Set Current Date`,
    props<{ date: Moment }>()),

  setHistoryApiError: createAction(`[${storeName}] Set History API Error`,
    props<{ error: ApiError }>()),
};

