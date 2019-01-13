import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesListComponent } from './containers/favorites-list/favorites-list.component';
import { FavoritePokeCardComponent } from './components/favorite-poke-card/favorite-poke-card.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes.favorites';

@NgModule({
  declarations: [FavoritesListComponent, FavoritePokeCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FavoritesModule { }
