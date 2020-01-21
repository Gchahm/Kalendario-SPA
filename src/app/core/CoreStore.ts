import {User} from './models/User';
import {LOGIN_USER, LOGOUT_USER} from './CoreActions';
import {tassign} from 'tassign';

export interface ICoreStore {
  isLoggedIn: boolean;
  user: User;
}

export const CORE_INITIAL_STATE: ICoreStore = {
  isLoggedIn: false,
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

export function coreReducer(state: ICoreStore = CORE_INITIAL_STATE, action): ICoreStore {
  switch (action.type) {
    case LOGIN_USER: return loginUser(state, action);
    case LOGOUT_USER: return logoutUser(state, action);
  }
  return state;
}
