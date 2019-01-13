import { Injectable } from '@angular/core';
import { ILogin } from '../models/login.interface';

import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _isLogged: boolean;

  constructor(private authFire: AngularFireAuth, private router: Router) {
    this.authFire.authState.subscribe(
      auth => {
        if (auth) {
          this._isLogged = true;
        } else {
          this._isLogged = false;
        }
      }
    );
  }

  login (auth: ILogin) {
    return this.authFire.auth.signInAndRetrieveDataWithEmailAndPassword(auth.email, auth.password);
  }

  isLoggedIn(): boolean {
    return this._isLogged;
  }

  loginWithGoogle() {
    return this.authFire.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    localStorage.removeItem('angularPokeApp');
    this.authFire.auth.signOut()
    .then(
      _ => {
        this.router.navigate(['/login']);
      }
    );
  }

  profileUser() {
    return this.authFire.authState;
   }
}
