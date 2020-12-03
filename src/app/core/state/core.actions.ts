import {Action} from '@ngrx/store';
import {IUser} from '@api/models';
import {ApiError} from '@api/Errors';
import {LoginModel} from '@api/models/LoginModel';
import {RegisterModel} from '@shared/services/auth.service';

export enum CoreActionsType {
  ToggleLeftPane = '[Core] Toggle LeftPane',
  ToggleShowLeftPaneButton = '[Core] Toggle Left Panel Button',
  ToggleIsMobile = '[Core] Toggle is Mobile View',
  ToggleIsTablet = '[Core] Toggle is Tablet View',
  InitializeUser = '[Core] Initialize User',
  InitializeUserSuccess = '[Core] Initialize User Success',
  Login = '[Core] Login',
  LoginSuccess = '[Core] Login Success',
  LoginFail = '[Core]  Login User Fail',
  Register = '[Core] Register',
  RegisterSuccess = '[Core] Register Success',
  RegisterFail = '[Core]  Register User Fail',
  Logout = '[Core] Logout',
  LogoutSuccess = '[Core] Logout Success',
  SetRequestCount = '[Core] Set Request Count',
  SetCompanyName = '[Core] Set Company Name',
}

export class ToggleLeftPane implements Action {
  readonly type = CoreActionsType.ToggleLeftPane;
}

export class ToggleShowLeftPaneButton implements Action {
  readonly type = CoreActionsType.ToggleShowLeftPaneButton;

  constructor(public payload: boolean) {
  }
}

export class ToggleIsTablet implements Action {
  readonly type = CoreActionsType.ToggleIsTablet;

  constructor(public payload: boolean) {
  }
}

export class ToggleIsMobile implements Action {
  readonly type = CoreActionsType.ToggleIsMobile;

  constructor(public payload: boolean) {
  }
}

export class InitializeUser implements Action {
  readonly type = CoreActionsType.InitializeUser;
}

export class InitializeUserSuccess implements Action {
  readonly type = CoreActionsType.InitializeUserSuccess;

  constructor(public payload: IUser) {
  }
}

export class Login implements Action {
  readonly type = CoreActionsType.Login;

  constructor(public payload: LoginModel) {
  }
}

export class LoginSuccess implements Action {
  readonly type = CoreActionsType.LoginSuccess;

  constructor(public payload: IUser) {
  }
}

export class LoginFail implements Action {
  readonly type = CoreActionsType.LoginFail;

  constructor(public payload: ApiError) {
  }
}

export class Register implements Action {
  readonly type = CoreActionsType.Register;

  constructor(public payload: RegisterModel) {
  }
}

export class RegisterSuccess implements Action {
  readonly type = CoreActionsType.RegisterSuccess;

  constructor(public payload: IUser) {
  }
}

export class RegisterFail implements Action {
  readonly type = CoreActionsType.RegisterFail;

  constructor(public payload: ApiError) {
  }
}

export class Logout implements Action {
  readonly type = CoreActionsType.Logout;
}

export class LogoutSuccess implements Action {
  readonly type = CoreActionsType.LogoutSuccess;
}


export class SetRequestCount implements Action {
  readonly type = CoreActionsType.SetRequestCount;

  constructor(public payload: number) {
  }
}


export class SetCompanyName implements Action {
  readonly type = CoreActionsType.SetCompanyName;

  constructor(public payload: string) {
  }
}

export type CoreActions = ToggleLeftPane |
  ToggleShowLeftPaneButton |
  ToggleIsMobile |
  ToggleIsTablet |
  InitializeUser |
  InitializeUserSuccess |
  Login |
  LoginSuccess |
  LoginFail |
  Register |
  RegisterSuccess |
  RegisterFail |
  Logout |
  LogoutSuccess |
  SetRequestCount |
  SetCompanyName;

