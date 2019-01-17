import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { LoginComponent } from './containers/login/login.component';
import { routes } from './routes.auth';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { reducer } from './reducers';





@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', reducer)
  ]
})
export class AuthModule { }
