import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSideNav = '[Layout] Open Left SideNav',
  CloseSideNav = '[Layout] Close Left SideNav'
}

// Defino la primera acción:
export class OpenSideNav implements Action {
  readonly type = LayoutActionTypes.OpenSideNav;
}

// Defino la segunda acción:
export class CloseSideNav implements Action {
  readonly type = LayoutActionTypes.CloseSideNav;
}

// Puede recibir cualquiera de los dos tipos.
// Tengo un solo tipo LayourActions, pero este puede ser de cualquiera de los dos tipos OpenSideNav ó CloseSideNav
export type LayoutActions =
  | OpenSideNav
  | CloseSideNav;
