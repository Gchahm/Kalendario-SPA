import {Action} from '@ngrx/store';
import {ApiError} from '@api/Errors';
import {RequestModel, Slot} from '@api/models';
import {Moment} from 'moment';
import {CompanyDetailsResult} from '@api/models/CompanyDetailsResult';
import {StripePaymentDetails} from '@api/clients/RequestClient.service';

export enum ActionTypes {
  RequestCompany = '[Company] Request Company',
  SetCompany = '[Company] Set Company',
  LoadCompanyFail = '[Company] Load Company Fail',
  SetDate = '[Company] Set Date',
  RequestSlots = '[Company] Request Slots',
  SetSlots = '[Company] Update Slots',
  SetCurrentSlotId = '[Company] Update Current Slot Id',
  LoadSlotsFail = '[Company] Load Slots Fail',
  RequestAddAppointmentRequest = '[Company] Request Add Appointment to Current',
  SetCurrentEmployeeId = '[Company] Set Current Employee Id',
  SetCurrentServiceId = '[Company] Set Current Service Id',
  SetCurrentCategoryId = '[Company] Set Current Category Id',
  DoNothing = '[Company] Do Nothing',
  SetServiceSearch = '[Company] Update Service Search',
  RequestCurrentRequest = '[Company] Request Current Request',
  SetCurrentRequest = '[Company] Update Current Request',
  OpenSlotsForServiceDialog = '[Company] Open Slots for Service Dialog',
  RequestRemoveAppointment = '[Company] Request Remove Appointment From Request',
  RequestConfirmCart = '[Company] Request Confirm Cart',
  RequestPaymentDetails = '[Company] Request Payment Details',
  SetPaymentDetails = '[Company] Set Payment Details',
  SetCheckoutMode = '[Company] Set Checkout Mode',
}


export class RequestCompany implements Action {
  readonly type = ActionTypes.RequestCompany;

  constructor(public payload: string) {
  }
}


export class SetCompany implements Action {
  readonly type = ActionTypes.SetCompany;

  constructor(public payload: CompanyDetailsResult) {
  }
}


export class LoadCompanyFail implements Action {
  readonly type = ActionTypes.LoadCompanyFail;

  constructor(public payload: ApiError) {
  }
}


export class SetDate implements Action {
  readonly type = ActionTypes.SetDate;

  constructor(public payload: Moment) {
  }
}


export class RequestSlots implements Action {
  readonly type = ActionTypes.RequestSlots;
}


export class SetSlots implements Action {
  readonly type = ActionTypes.SetSlots;

  constructor(public payload: Slot[]) {
  }
}


export class SetCurrentSlotId implements Action {
  readonly type = ActionTypes.SetCurrentSlotId;

  constructor(public id: number) {
  }
}


export class LoadSlotsFail implements Action {
  readonly type = ActionTypes.LoadSlotsFail;

  constructor(public payload: ApiError) {
  }
}

export class RequestAddAppointmentRequest implements Action {
  readonly type = ActionTypes.RequestAddAppointmentRequest;
}


export class SetCurrentEmployeeId implements Action {
  readonly type = ActionTypes.SetCurrentEmployeeId;

  constructor(public payload: number) {
  }
}


export class SetCurrentServiceId implements Action {
  readonly type = ActionTypes.SetCurrentServiceId;

  constructor(public payload: number) {
  }
}


export class SetCurrentCategoryId implements Action {
  readonly type = ActionTypes.SetCurrentCategoryId;

  constructor(public payload: number) {
  }
}


export class DoNothing implements Action {
  readonly type = ActionTypes.DoNothing;
}


export class SetServiceSearch implements Action {
  readonly type = ActionTypes.SetServiceSearch;

  constructor(public payload: string) {
  }
}


export class RequestCurrentRequest implements Action {
  readonly type = ActionTypes.RequestCurrentRequest;

  constructor(public payload: number) {
  }
}


export class SetCurrentRequest implements Action {
  readonly type = ActionTypes.SetCurrentRequest;

  constructor(public payload: RequestModel) {
  }
}


export class OpenSlotsForServiceDialog implements Action {
  readonly type = ActionTypes.OpenSlotsForServiceDialog;
}


export class RequestRemoveAppointment implements Action {
  readonly type = ActionTypes.RequestRemoveAppointment;

  constructor(public payload: number) {
  }
}


export class RequestConfirmCart implements Action {
  readonly type = ActionTypes.RequestConfirmCart;

  constructor(public customerNotes: string) {
  }
}


export class RequestPaymentDetails implements Action {
  readonly type = ActionTypes.RequestPaymentDetails;

  constructor(public id: number) {
  }
}


export class SetPaymentDetails implements Action {
  readonly type = ActionTypes.SetPaymentDetails;

  constructor(public details: StripePaymentDetails) {
  }
}


export class SetCheckoutMode implements Action {
  readonly type = ActionTypes.SetCheckoutMode;

  constructor(public payload: boolean) {
  }
}


export type CompanyActions = RequestCompany |
  SetCompany |
  LoadCompanyFail |
  SetDate |
  RequestSlots |
  SetSlots |
  SetCurrentSlotId |
  LoadSlotsFail |
  RequestAddAppointmentRequest |
  SetCurrentEmployeeId |
  SetCurrentServiceId |
  SetCurrentCategoryId |
  DoNothing |
  SetServiceSearch |
  RequestCurrentRequest |
  SetCurrentRequest |
  OpenSlotsForServiceDialog |
  RequestRemoveAppointment |
  RequestConfirmCart |
  RequestPaymentDetails |
  SetPaymentDetails |
  SetCheckoutMode;
