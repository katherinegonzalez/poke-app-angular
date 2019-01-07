import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';

import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActive(): Observable<boolean> {

    const authState = this.authService.isLoggedIn;

    if (!authState && !localStorage.getItem('angularPokeApp')) {
      this.router.navigate(['/login']);
      return of(false);
    } else {
      return of(true);
    }
  }
}
