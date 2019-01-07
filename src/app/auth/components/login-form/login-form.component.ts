import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ILogin } from '../../models/login.interface';
import { Login } from '../../models/login';
import {FormBuilder, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output() submitted = new EventEmitter<string>();
  @Output() signWithGoogle =  new EventEmitter<string>();

  login: ILogin;

  constructor(private formBuilder: FormBuilder) {
    this.login = new Login();
  }


  loginForm = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  ngOnInit() {
  }

  submit(event: ILogin) {
    this.submitted.emit(this.loginForm.value);
  }

  loginGoogle() {
    this.signWithGoogle.emit(this.loginForm.value);
  }

}
