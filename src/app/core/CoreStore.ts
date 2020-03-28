import {User} from './models/User';
import {
  LOGIN_USER,
  LOGOUT_USER,
  TOGGLE_LEFT_PANE_BUTTON_VISIBILITY,
  TOGGLE_LEFT_PANE,
  SET_IS_MOBILE_VIEW_FLAG,
  SET_IS_TABLET_VIEW_FLAG
} from './CoreActions';
import {tassign} from 'tassign';

export interface ICoreStore {
  isLoggedIn: boolean;
  isMobileView: boolean;
  isTabletView: boolean;
  leftPaneOpen: boolean;
  showLeftPane: boolean;
  user: User;
}

export const CORE_INITIAL_STATE: ICoreStore = {
  isMobileView: false,
  isTabletView: false,
  isLoggedIn: false,
  leftPaneOpen: false,
  showLeftPane: false,
  user: null,
};

function loginUser(state: ICoreStore, action): ICoreStore {
  return tassign(state, {
    user: action.user,
    isLoggedIn: true
    }
  );
}

function logoutUser(state: ICoreStore, action): ICoreStore {
  return tassign(state, {
    user: action.user,
    isLoggedIn: false
  });
}


function toggleLeftPane(state: ICoreStore, action): ICoreStore {
  return tassign(state, {
    leftPaneOpen: !state.leftPaneOpen
  });
}

function showHideLeftPaneButton(state: ICoreStore, action): ICoreStore {
  return tassign(state, {
    showLeftPane: action.isVisible
  });
}

function setIsMobileViewFlag(state: ICoreStore, action) {
  return tassign(state, {
    isMobileView: action.value
  });
}

function setIsTabletViewFlag(state: ICoreStore, action) {
  return tassign(state, {
    isTabletView: action.value
  });
}

export function coreReducer(state: ICoreStore = CORE_INITIAL_STATE, action): ICoreStore {
  switch (action.type) {
    case LOGIN_USER: return loginUser(state, action);
    case LOGOUT_USER: return logoutUser(state, action);
    case TOGGLE_LEFT_PANE: return toggleLeftPane(state, action);
    case TOGGLE_LEFT_PANE_BUTTON_VISIBILITY: return showHideLeftPaneButton(state, action);
    case SET_IS_MOBILE_VIEW_FLAG: return setIsMobileViewFlag(state, action);
    case SET_IS_TABLET_VIEW_FLAG: return setIsTabletViewFlag(state, action);
  }
  return state;
}
