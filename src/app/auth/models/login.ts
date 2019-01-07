import { ILogin } from './login.interface';

export class Login implements ILogin {
  email: string;
  password: string;

  constructor(){}
}
