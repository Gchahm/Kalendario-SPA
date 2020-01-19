import {combineReducers} from 'redux';
import {COMPANY_INITIAL_STATE, companyReducer, ICompanyState} from './company/store';

export interface IAppState {
  company: ICompanyState;
}

export const INITIAL_STATE: IAppState = {
  company: COMPANY_INITIAL_STATE
};

export const rootReducer = combineReducers({
  company: companyReducer
});

