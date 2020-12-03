import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {IAppointment, Employee, Appointment} from '@api/models';
import {actions} from './appointments.actions';
import {on} from '@ngrx/store';
import {Moment} from 'moment';
import {ApiError} from '@api/Errors';
import {IAppointmentHistory} from '@api/models/AppointmentHistory';

export enum AppointmentType {
  self = 'SELF',
  service = 'SERVICE'
}


export interface State extends BaseEntityState<IAppointment> {
  initialize: { type: string, employee: Employee, date: Moment };
  currentAppointmentHistory: IAppointmentHistory[];
  currentDate: string;
  historyApiError: ApiError;
}


const initialState: State = {
  ...baseInitialState<IAppointment>(),
  initialize: null,
  currentAppointmentHistory: null,
  currentDate: null,
  historyApiError: null
};


export const adapter = createBaseAdapter<IAppointment>(Appointment);


export const reducer = createBaseReducer<IAppointment>(initialState, adapter, actions,
  on(actions.initializeCurrentSelfAppointment, (state, {date, employee}) => ({
    ...state,
    initialize: {date, employee, type: AppointmentType.self},
  })),
  on(actions.initializeCurrentAppointment, (state, {date, employee}) => ({
    ...state,
    initialize: {date, employee, type: AppointmentType.service},
  })),

  on(actions.setAppointmentHistory, (state, {appointments}) => ({
    ...state,
    currentAppointmentHistory: appointments
  })),

  on(actions.setCurrentDate, (state, {date}) => ({
    ...state,
    currentDate: date.toISOString()
  })),


  on(actions.setHistoryApiError, (state: State, {error}) => ({
    ...state,
    historyApiError: error
  })),
);
