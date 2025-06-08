import {Action} from '@ngrx/store';
import {
  Company,
  CompanyConfig,
  CompanyStripeDetails,
  ICompanyWriteModel,
  IConfigWriteModel,
  Partial
} from '@api/models';
import {ApiError} from '@api/Errors';
import {ImageSnippet} from '@shared/components/image-input/image-input.component';

export enum ActionTypes {
  ToggleEditCompany = '[AdminCompany] Toggle Edit Company',
  ToggleEditConfig = '[AdminCompany] Toggle Edit Config',
  RequestCompany = '[AdminCompany] Request Company',
  SetCompany = '[AdminCompany] Set Company',
  SetConfig = '[AdminCompany] Set Config',
  SetApiError = '[AdminCompany] Set API Error',
  SetStripeDetailsAPiError = '[AdminCompany] Set Stripe Details API Error',
  SetStripeUrlAPiError = '[AdminCompany] Set Stripe URL API Error',
  RequestUpdateCompany = ' [AdminCompany] Request Update Company',
  RequestUpdateConfig = ' [AdminCompany] Request Update Config',
  RequestPhotoUpdate = ' [AdminCompany] Request Update Company Avatar',
  RequestCreateStripeAccount = ' [AdminCompany] Request Create Stripe Account',
  RequestStripeDetails = ' [AdminCompany] Request Stripe Details',
  SetStripeDetails = ' [AdminCompany] Set Stripe Details',
}

export class ToggleEditConfig implements Action {
  readonly type = ActionTypes.ToggleEditConfig;

  constructor(public payload: boolean) {
  }
}

export class ToggleEditCompany implements Action {
  readonly type = ActionTypes.ToggleEditCompany;

  constructor(public payload: boolean) {
  }
}


export class RequestCompany implements Action {
  readonly type = ActionTypes.RequestCompany;
}


export class SetCompany implements Action {
  readonly type = ActionTypes.SetCompany;

  constructor(public payload: Company) {
  }
}


export class SetConfig implements Action {
  readonly type = ActionTypes.SetConfig;

  constructor(public payload: CompanyConfig) {
  }
}

export class SetApiError implements Action {
  readonly type = ActionTypes.SetApiError;

  constructor(public payload: ApiError) {
  }
}


export class SetStripeDetailsAPiError implements Action {
  readonly type = ActionTypes.SetStripeDetailsAPiError;

  constructor(public payload: ApiError) {
  }
}


export class SetStripeUrlAPiError implements Action {
  readonly type = ActionTypes.SetStripeUrlAPiError;

  constructor(public payload: ApiError) {
  }
}


export class RequestUpdateCompany implements Action {
  readonly type = ActionTypes.RequestUpdateCompany;

  constructor(public id, public partial: Partial<ICompanyWriteModel>) {
  }
}


export class RequestUpdateConfig implements Action {
  readonly type = ActionTypes.RequestUpdateConfig;

  constructor(public id, public partial: Partial<IConfigWriteModel>) {
  }
}


export class RequestPhotoUpdate implements Action {
  readonly type = ActionTypes.RequestPhotoUpdate;

  constructor(public image: ImageSnippet) {
  }
}


export class RequestCreateStripeAccount implements Action {
  readonly type = ActionTypes.RequestCreateStripeAccount;
}


export class RequestStripeDetails implements Action {
  readonly type = ActionTypes.RequestStripeDetails;
}


export class SetStripeDetails implements Action {
  readonly type = ActionTypes.SetStripeDetails;

  constructor(public payload: CompanyStripeDetails) {
  }
}


export type CompanyActions = ToggleEditConfig |
  ToggleEditCompany |
  RequestCompany |
  SetConfig |
  SetCompany |
  SetApiError |
  SetStripeDetailsAPiError |
  SetStripeUrlAPiError |
  RequestUpdateCompany |
  RequestUpdateConfig |
  RequestPhotoUpdate |
  RequestCreateStripeAccount |
  RequestStripeDetails |
  SetStripeDetails;

