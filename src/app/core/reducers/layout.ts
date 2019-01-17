import { LayoutActions, LayoutActionTypes } from '../actions/layout';
import { stateChanges } from '@angular/fire/database';

// Aquí vamos a definir el estado: hijo del layout que definimos en index.ts (primer nivel)

export interface State {
  showSideNav: string;
}

const initialState: State = {
  showSideNav: 'open'
};

// Funcion reducer que modificará el estado dependiendo de la acción:
// En action que es de tipo LayoutActionTypes Puede recibir OpenSideNav o CloseSideNav como se definió en actions/layout.ts
export function reducer(state = initialState, action: LayoutActions): State {
  switch (action.type) {
    case LayoutActionTypes.OpenSideNav:
      return {
        ...state, // sirve para solo reemplazar esta propiedad del objeto, sin tener que reescribirlo todo
        showSideNav: 'open'
      };
      case LayoutActionTypes.CloseSideNav:
        return {
          ...state,
          showSideNav: 'close'
        };
      default:
        return state;
  }
}

export const getShowSideNav = (state: State) => state.showSideNav;
