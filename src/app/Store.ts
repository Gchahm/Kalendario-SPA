import {combineReducers} from 'redux';
import {COMPANY_INITIAL_STATE, companyReducer, ICompanyState} from './company/store';
import {CORE_INITIAL_STATE, coreReducer, ICoreStore} from '@core/CoreStore';
import {ADMIN_INITIAL_STATE, adminReducer, IAdminStore} from '@admin-schedule/AdminStore';
import {ISchedulingStore, SCHEDULING_INITIAL_STATE, schedulingReducer} from '@admin-schedule/SchedulingStore';

export interface IAppState {
  core: ICoreStore;
  company: ICompanyState;
  admin: IAdminStore;
  scheduling: ISchedulingStore;
}

export const INITIAL_STATE: IAppState = {
  core: CORE_INITIAL_STATE,
  company: COMPANY_INITIAL_STATE,
  admin: ADMIN_INITIAL_STATE,
  scheduling: SCHEDULING_INITIAL_STATE
};

export const rootReducer = combineReducers({
  core: coreReducer,
  company: companyReducer,
  admin: adminReducer,
  scheduling: schedulingReducer
});

