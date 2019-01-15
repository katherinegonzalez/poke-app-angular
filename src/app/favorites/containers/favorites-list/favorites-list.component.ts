import { Component, OnInit } from '@angular/core';
import { IPokeList } from 'src/app/poke-main/models/interfaces/poke-list';
import { PokeListService } from '../../../poke-main/services/poke-list.service';
import {IPokemon} from '../../../poke-main/models/interfaces/pokemon';
import { FavoriteService } from '../../services/favorite.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {

  pokemons: any[];
  message: string;

  constructor(
    private pokeListService: PokeListService,
    private favoriteService: FavoriteService,
    private authService: AuthService) { }

  ngOnInit() {

    window.addEventListener('change', this.searchPokemons.bind(this));

    this.getPokemonsFavorites();
  }

  getPokemonsFavorites() {
    this.authService.profileUser()
    .subscribe(
      user => {
        this.favoriteService.listFavorites(user).subscribe(
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
    );
  }

  getPokemonFavoriteSearched(namePokemon: string) {
    this.authService.profileUser()
    .subscribe(
      user => {
        this.favoriteService.searchFavorites(user, namePokemon).subscribe(
          list => {
            if (list.length > 0) {
              this.pokemons = list.filter(function (el) {
                return el != null;
              });
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
    if (event.target.id === 'searchPokemon') {
      if (event.srcElement.value === '' || event.srcElement.value === null || event.srcElement.value === undefined) {
        this.getPokemonsFavorites();
      } else {
        this.getPokemonFavoriteSearched(event.srcElement.value.toLowerCase());
      }
    }
  }

}
