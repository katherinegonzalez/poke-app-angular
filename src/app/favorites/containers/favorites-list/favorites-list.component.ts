import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPokeList } from 'src/app/poke-main/models/interfaces/poke-list';
import { PokeListService } from '../../../poke-main/services/poke-list.service';
import {IPokemon} from '../../../poke-main/models/interfaces/pokemon';
import { FavoriteService } from '../../services/favorite.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit, OnDestroy {

  pokemons: any[];
  message: string;
  private subscribeListFavorites: any;
  private subscribeSearchFavorites: any;
  private subscribeAuth: any;

  constructor(
    private pokeListService: PokeListService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {

    window.addEventListener('change', this.searchPokemons.bind(this));

    this.getPokemonsFavorites();
  }

  ngOnDestroy() {
    if (this.subscribeListFavorites !== undefined && this.subscribeListFavorites !== null) {
      this.subscribeListFavorites.unsubscribe();
    }

    if (this.subscribeSearchFavorites !== undefined && this.subscribeSearchFavorites !== null) {
      this.subscribeSearchFavorites.unsubscribe();
    }

    if (this.subscribeAuth !== undefined && this.subscribeAuth !== null) {
      this.subscribeAuth.unsubscribe();
    }
  }

  getPokemonsFavorites() {
    this.subscribeAuth = this.authService.profileUser()
    .subscribe(
      user => {
        if (user !== null) {
          this.subscribeListFavorites = this.favoriteService.listFavorites(user).subscribe(
            list => {
              if (list.length > 0) {
                this.pokemons = list;
              } else {
                this.pokemons = [];
                this.message = 'No hay favoritos para mostrar';
              }
            }
          );
        }
      }
    );
  }

  getPokemonFavoriteSearched(namePokemon: string) {
    this.subscribeAuth = this.authService.profileUser()
    .subscribe(
      user => {
        this.subscribeSearchFavorites = this.favoriteService.searchFavorites(user, namePokemon).subscribe(
          list => {
            if (list.length > 0) {
              this.pokemons = list.filter(function (el) {
                return el != null;
              });
              if (this.pokemons.length === 0) {
                this.message = 'No se encontraron pokemons con este nombre';
              }
            } else {
              this.pokemons = [];
              this.message = 'No hay favoritos para mostrar';
            }
          }
        );
      }
    );
  }
  searchPokemons(event) {
    if (this.router.url.includes('favorites')) {
      if (event.target.id === 'searchPokemon') {
        if (event.srcElement.value === '' || event.srcElement.value === null || event.srcElement.value === undefined) {
          this.getPokemonsFavorites();
        } else {
          this.getPokemonFavoriteSearched(event.srcElement.value.toLowerCase());
        }
      }
    }
  }


}
