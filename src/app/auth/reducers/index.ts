import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAuth from './auth';


export interface State extends fromRoot.State {
  auth: fromAuth.State; // Le agrega una propiedad auth al arbol: el árbol quedaría: layout -> auth
}

export const reducer = fromAuth.reducer;

export const selectAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getLoading =  createSelector(
  selectAuthState,
  fromAuth.getLoading
);
export const getLoaded =  createSelector(
  selectAuthState,
  fromAuth.getLoaded
);
export const getError =  createSelector(
  selectAuthState,
  fromAuth.getError
);
export const getLoggedIn =  createSelector(
  selectAuthState,
  fromAuth.getError
);
export const getUser =  createSelector(
  selectAuthState,
  fromAuth.getUser
);



