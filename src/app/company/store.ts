import {Employee} from '../core/models/Employee';
import {SET_COMPANY_NAME} from './actions';
import {tassign} from 'tassign';

export interface ICompanyState {
  companyName: string;
  employees: Employee[];
}

export const COMPANY_INITIAL_STATE: ICompanyState = {
  companyName: '',
  employees: [],
};

function setCompanyName(state: ICompanyState, action) {
  return tassign(state, {
    companyName: action.name
  });
}

export function companyReducer(state: ICompanyState = COMPANY_INITIAL_STATE, action): ICompanyState {
  switch (action.type) {
    case SET_COMPANY_NAME: return setCompanyName(state, action);
  }
  return state;
}
