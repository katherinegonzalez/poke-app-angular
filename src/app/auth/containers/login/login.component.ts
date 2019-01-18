import { Component, OnInit, NgZone } from '@angular/core';
import { ILogin } from '../../models/login.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import * as Auth from '../../actions/auth';
import { Observable } from 'rxjs';
import { MessagesService } from 'src/app/alerts/services/messages.service';
import { UserInfo } from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error$: Observable<string> = this.store.pipe(select(fromAuth.getError));

  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone,
    private store: Store<fromAuth.State>,
    private msgService: MessagesService) {

      this.error$.subscribe(
        error => {
          this.msgService.message({msg: 'Usuario o Contraseña', type: 'error'});
        }
      );

    }

  ngOnInit() {
  }

  auth(event: ILogin) {
    this.store.dispatch(new Auth.Login(event)); // Cambiamos el resultado de esta acción
    if (event) {
      this.authService.login(event)
      .then(
          user => {
            localStorage.setItem('angularPokeApp', JSON.stringify(user));
            this.store.dispatch(new Auth.LoginSuccessful(<UserInfo>user.user.toJSON()));
            this.router.navigate(['main']);
          },
          error => {
            this.store.dispatch(new Auth.LoginError(error));
          }
      );
    }
  }

  signInGoogle(event) {
    if (event) {
      this.authService.loginWithGoogle()
      .then(
        user => {
          localStorage.setItem('angularPokeApp', JSON.stringify(user));
          this.zone.run(
            _ => {
              this.router.navigate(['main']);
            }
          );
        }
      );
    }
  }

}
