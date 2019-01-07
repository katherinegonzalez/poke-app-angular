import { Component, OnInit, NgZone } from '@angular/core';
import { ILogin } from '../../models/login.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private zone: NgZone) { }

  ngOnInit() {
  }

  auth(event: ILogin) {
    if (event) {
      this.authService.login(event)
      .then(
          user => {
            localStorage.setItem('angularPokeApp', JSON.stringify(user));
            this.router.navigate(['main']);
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
