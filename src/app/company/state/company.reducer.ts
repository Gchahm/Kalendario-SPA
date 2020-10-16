import {CompanyDetailsResult, RequestModel} from '@api/models';
import {ApiError} from '@api/Errors';
import {ActionTypes, CompanyActions} from '@app/company/state/company.actions';
import * as moment from 'moment';
import {ServiceSlot} from '@company/state/index';
import {StripePaymentDetails} from '@api/clients/RequestClient.service';


export interface State {
  company: CompanyDetailsResult | null;
  date: string;
  disableDateInput: boolean;
  currentEmployeeId: number | null;
  currentServiceId: number | null;
  currentCategoryId: number | null;
  serviceSearch: string;
  slots: ServiceSlot[] | null;
  currentSlotId: number | null;
  loadingSlots: boolean;
  apiError: ApiError | null;
  currentRequest: RequestModel;
  paymentDetails: StripePaymentDetails;
  checkoutMode: boolean;
}

const initialState: State = {
  company: null,
  date: moment.utc().add(1, 'day').toISOString(),
  disableDateInput: false,
  currentEmployeeId: null,
  currentServiceId: null,
  currentCategoryId: null,
  serviceSearch: '',
  slots: [],
  currentSlotId: null,
  loadingSlots: false,
  apiError: null,
  currentRequest: null,
  paymentDetails: null,
  checkoutMode: false
};


export function reducer(state: State = initialState, action: CompanyActions) {
  switch (action.type) {

    case ActionTypes.SetCompany:
      let serviceId = state.currentServiceId;
      if (state.currentEmployeeId !== null && state.currentServiceId === null) {
        const emp = action.payload.employees.find(e => e.id === state.currentEmployeeId);
        serviceId = emp === null ? null : emp.services.find(s => s === s);
      }
      return {
        ...state,
        company: action.payload,
        currentCategoryId: action.payload.serviceCategories.map(s => s.id).find(s => s === s),
        apiError: null
      };

    case ActionTypes.LoadCompanyFail:
      return {
        ...state,
        apiError: action.payload
      };

    case ActionTypes.SetDate:
      return {
        ...state,
        date: action.payload.toISOString()
      };

    case ActionTypes.RequestSlots:
      return {
        ...state,
        loadingSlots: true
      };

    case ActionTypes.SetSlots:
      let count = 0;
      return {
        ...state,
        currentSlotId: null,
        apiError: null,
        loadingSlots: false,
        slots: action.payload.map(slot => ({
          id: count++,
          title: slot.start.format('HH:mm') + ' - ' + slot.end.format('HH:mm'),
          start: slot.start,
          end: slot.end,
        }))
      };

    case ActionTypes.SetCurrentSlotId:
      return {
        ...state,
        currentSlotId: action.id,
      };

    case ActionTypes.LoadSlotsFail:
      return {
        ...state,
        apiError: action.payload,
        loadingSlots: false
      };

    case ActionTypes.SetCurrentEmployeeId:
      return {
        ...state,
        currentEmployeeId: action.payload === 0 ? null : action.payload,
      };

    case ActionTypes.SetCurrentServiceId:
      return {
        ...state,
        currentServiceId: action.payload
      };

    case ActionTypes.DoNothing:
      return {
        ...state,
      };

    case ActionTypes.SetCurrentCategoryId:
      return {
        ...state,
        currentCategoryId: action.payload
      };

    case ActionTypes.SetServiceSearch:
      return {
        ...state,
        serviceSearch: action.payload
      };

    case ActionTypes.SetCurrentRequest:
      return {
        ...state,
        currentRequest: action.payload,
        disableDateInput: action.payload.itemsCount > 0,
        date: action.payload.itemsCount > 0 ? action.payload.scheduledDate : state.date
      };

    case ActionTypes.SetPaymentDetails:
      return {
        ...state,
        paymentDetails: action.details
      };

    case ActionTypes.SetCheckoutMode:
      return {
        ...state,
        checkoutMode: action.payload
      };

    default:
      return state;
  }
}
