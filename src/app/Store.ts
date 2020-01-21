import {combineReducers} from 'redux';
import {COMPANY_INITIAL_STATE, companyReducer, ICompanyState} from './company/store';
import {CORE_INITIAL_STATE, coreReducer, ICoreStore} from './core/CoreStore';

export interface IAppState {
  core: ICoreStore;
  company: ICompanyState;
}

export const INITIAL_STATE: IAppState = {
  core: CORE_INITIAL_STATE,
  company: COMPANY_INITIAL_STATE
};

export const rootReducer = combineReducers({
  core: coreReducer,
  company: companyReducer
});

