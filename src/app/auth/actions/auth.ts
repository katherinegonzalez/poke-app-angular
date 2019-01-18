import { Action } from '@ngrx/store';
import { ILogin } from '../models/login.interface';
import { UserInfo } from 'firebase';

// Definimos las acciones
 export enum AuthActionTypes {
  Login = '[Auth] Send Login',
  LoginSuccessful = '[Auth] Login Successful',
  LoginError = '[Auth] Login Error'
 }

 // Creamos las acciones
export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: ILogin) {

  } // Cuando llamemos a esta acción le pasaremos este objeto para continuar con el siguiente paso
}

export class LoginSuccessful implements Action {
  readonly type = AuthActionTypes.LoginSuccessful;

  constructor(public payload: UserInfo) {}
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LoginError;

  constructor(public payload: any) {}
}

export type AuthActions =
  | Login
  | LoginSuccessful
  | LoginError;

