import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { HeaderAsideLeftComponent } from './components/header-aside-left/header-aside-left.component';
import { TopSearchFormComponent } from './components/top-search-form/top-search-form.component';
import { AsideLeftComponent } from './containers/aside-left/aside-left.component';
import { CoreComponent } from './containers/core/core.component';
import { MainContentComponent } from './containers/main-content/main-content.component';
import { TopNavBarComponent } from './containers/top-nav-bar/top-nav-bar.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';

import { routes } from './routes.core';
import { DetailPokemonComponent } from './containers/detail-pokemon/detail-pokemon.component';
import { AlertsModule } from '../alerts/alerts.module';

@NgModule({
  declarations: [
    HeaderAsideLeftComponent,
    TopSearchFormComponent,
    AsideLeftComponent,
    CoreComponent,
    MainContentComponent,
    TopNavBarComponent,
    MainMenuComponent,
    DetailPokemonComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forChild(routes),
    AlertsModule
  ],
  exports: [
    CoreComponent
  ]
})
export class CoreModule { }
