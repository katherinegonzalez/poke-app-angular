import { AuthActions, AuthActionTypes } from '../actions/auth';
import { User } from 'firebase';

export interface State {
  loading: boolean;
  loaded: boolean;
  error: any | null;
  loggedIn: boolean;
  user: User | null;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  error: null,
  loggedIn: false,
  user: null
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.Login: {
      return {
        ...state,
        loading: true
      };
    }

    case AuthActionTypes.LoginSuccessful: {
      return {
        ...state,
        loading: true,
        loaded: true,
        user: action.payload,
        loggedIn: true
      };
    }

    case AuthActionTypes.LoginError: {
      return {
        ...state,
        loading: true,
        error: action.payload,
        loggedIn: false
      };
    }

    default:
      return state;
  }
}

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getError = (state: State) => state.error;
export const getUser = (state: State) => state.user;
export const getLoggedIn = (state: State) => state.loggedIn;




