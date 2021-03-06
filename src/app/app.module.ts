import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './auth/components/login-form/login-form.component';
import { MainMenuComponent } from './core/components/main-menu/main-menu.component';
import { LoginComponent} from './auth/containers/login/login.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { routes } from './routes';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducer} from './reducers';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CoreModule,
    AuthModule,
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angular-poke-app'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule,
    NgxPaginationModule,
    StoreModule.forRoot(reducers, {metaReducers: metaReducer}),
    StoreDevtoolsModule.instrument(
      {
        name: 'Bzg Poke App', // Identificador de la App en el plugin
        logOnly: environment.production, // En producción solo permite ver logs
        maxAge: 30 // Historial de estados
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
