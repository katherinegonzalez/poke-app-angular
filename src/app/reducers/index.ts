import {
  ActionReducerMap, // define la estructura del reducer
  createSelector, // los selectores: sirven para buscar en el arbol que arma redux -> similar a las queries en una base de datos
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';

import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import * as fromLayout from '../core/reducers/layout';

export interface State { // Para definir una estructura
  layout: fromLayout.State; // primer nivel de la aplicación (primer nivel del árbol)
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer
};

// Para apoder tener un log del paso a paso de la aplicación:
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    // Estado y acción de la aplicación
    // tslint:disable-next-line:no-console
    console.info('state', state);
    // tslint:disable-next-line:no-console
    console.info('action', action);
    return reducer(state, action);
  };
}

export const metaReducer: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze] : [];

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getShowSideNav = createSelector( // Así podemos obtener la información y actualizarla
  getLayoutState,
  fromLayout.getShowSideNav
);
