import {ApiError} from '@api/Errors';
import {CoreActions, CoreActionsType} from './core.actions';
import {User} from '@api/models';

export interface CoreState {
  isMobile: boolean;
  isTablet: boolean;
  showLeftPaneButton: boolean;
  isLeftPanelOpen: boolean;
  user: User;
  apiError: ApiError | null;
  requestCount: number;
  companyName: string | null;
}

export const initialState: CoreState = {
  isMobile: false,
  isTablet: false,
  showLeftPaneButton: false,
  isLeftPanelOpen: false,
  user: null,
  apiError: null,
  requestCount: 0,
  companyName: null
};


export function reducer(state: CoreState = initialState, action: CoreActions): CoreState {
  switch (action.type) {
    case CoreActionsType.InitializeUserSuccess:
      return {
        ...state,
        user: action.payload,
        apiError: null
      };

    case CoreActionsType.LoginSuccess:
      return {
        ...state,
        user: action.payload,
        apiError: null
      };

    case CoreActionsType.LoginFail:
      return {
        ...state,
        apiError: action.payload
      };

    case CoreActionsType.RegisterSuccess:
      return {
        ...state,
        user: action.payload,
        apiError: null
      };

    case CoreActionsType.RegisterFail:
      return {
        ...state,
        apiError: action.payload
      };

    case CoreActionsType.ToggleLeftPane:
      return {
        ...state,
        isLeftPanelOpen: !state.isLeftPanelOpen
      };

    case CoreActionsType.ToggleShowLeftPaneButton:
      return {
        ...state,
        showLeftPaneButton: action.payload
      };

    case CoreActionsType.ToggleIsMobile:
      return {
        ...state,
        isMobile: action.payload
      };

    case CoreActionsType.ToggleIsTablet:
      return {
        ...state,
        isTablet: action.payload
      };

    case CoreActionsType.LogoutSuccess: {
      return {
        ...state,
        user: User.AnonymousUser()
      };
    }

    case CoreActionsType.SetRequestCount: {
      return {
        ...state,
        requestCount: action.payload
      };
    }

    case CoreActionsType.SetCompanyName: {
      return {
        ...state,
        companyName: action.payload
      };
    }

    default:
      return state;
  }
}
