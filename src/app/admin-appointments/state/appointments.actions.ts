import {BaseEntityActions, createActions} from '@shared/state/base/actions';
import {Appointment, Employee} from '@api/models';
import {ActionCreator, createAction, props} from '@ngrx/store';
import {TypedAction} from '@ngrx/store/src/models';
import {Moment} from 'moment';


export const storeName = 'adminAppointments';


interface AppointmentActions extends BaseEntityActions<Appointment> {
  requestSelfAppointmentUpdate: ActionCreator<string, (props: { entity: Appointment }) =>
    ({ entity: Appointment } & TypedAction<string>)>;

  requestSelfAppointmentCreate: ActionCreator<string, (props: { entity: Appointment }) =>
    ({ entity: Appointment } & TypedAction<string>)>;

  requestAppointmentHistory: ActionCreator<string, (props: {}) =>
    ({} & TypedAction<string>)>;

  openCreateAppointmentDialog: ActionCreator<string, (props: { date: Moment, employee: Employee }) =>
    ({ date: Moment, employee: Employee } & TypedAction<string>)>;

  openCreateSelfAppointmentDialog: ActionCreator<string, (props: { date: Moment, employee: Employee }) =>
    ({ date: Moment, employee: Employee } & TypedAction<string>)>;

  initializeCurrentAppointment: ActionCreator<string, (props: { date: Moment, employee: Employee }) =>
    ({ date: Moment, employee: Employee } & TypedAction<string>)>;

  initializeCurrentSelfAppointment: ActionCreator<string, (props: { date: Moment, employee: Employee }) =>
    ({ date: Moment, employee: Employee } & TypedAction<string>)>;

  setAppointmentHistory: ActionCreator<string, (props: { appointments: Appointment[] }) =>
    ({ appointments: Appointment[] } & TypedAction<string>)>;

  setCurrentDate: ActionCreator<string, (props: { date: Moment }) =>
    ({ date: Moment } & TypedAction<string>)>;
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
    props<{ date: Moment, employee: Employee }>()),

  openCreateSelfAppointmentDialog: createAction(`[${storeName}] Open Create Self Appointment`,
    props<{ date: Moment, employee: Employee }>()),

  initializeCurrentAppointment: createAction(`[${storeName}] Initialize Appointment`,
    props<{ date: Moment, employee: Employee }>()),

  initializeCurrentSelfAppointment: createAction(`[${storeName}] Initialize Self appointment`,
    props<{ date: Moment, employee: Employee }>()),

  setAppointmentHistory: createAction(`[${storeName}] Set Appointment History`,
    props<{ appointments: Appointment[] }>()),

  setCurrentDate: createAction(`[${storeName}] Set Current Date`,
    props<{ date: Moment }>()),
};

