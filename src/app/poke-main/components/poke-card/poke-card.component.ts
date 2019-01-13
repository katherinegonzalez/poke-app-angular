import { Component, OnInit, Input } from '@angular/core';
import { IPokemon } from '../../models/interfaces/pokemon';
import {PokeListService} from '../../services/poke-list.service';
import { MessagesService } from 'src/app/alerts/services/messages.service';


@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.css']
})
export class PokeCardComponent implements OnInit {

  _pokeResult: IPokemon;
  _poke: any;
  _favorite: Boolean = false;
  key: string;

  @Input()
  get poke(): IPokemon {
    return this._pokeResult;
  }
  set poke(result: IPokemon) {
    this.pokeService.getPokemon(result.name).subscribe(
      pokemon => {
        this.isFavorite(pokemon);
        // console.log(pokemon);
        // this._poke = pokemon;
      }
    );
  }

  constructor(
    private pokeService: PokeListService,
    private alertMessage: MessagesService) { }

  ngOnInit() {

  }

  addFavorite(pokemon) {
    this.pokeService.addFavorite(pokemon).
    then(_ => {
      this.alertMessage.message({msg: pokemon.name + ' ha sido agregado a favoritos', type: 'success'});
      this._poke.isFavorite = true;
    }).catch(error => {
      this.alertMessage.message({msg: 'No fue posible quitar a ' + pokemon.name + ' de favoritos', type: 'error'});
    });
  }

  removeFavorite(pokemon) {
    this.pokeService.removeFavorite(pokemon.key, pokemon.name)
    .then(_ => {
      this.alertMessage.message({msg: 'Has quitado a ' + pokemon.name + ' de favoritos', type: 'success'});
      this._poke.isFavorite = false;
    }).catch(error => {
      this.alertMessage.message({msg: 'No fue posible quitar a ' + pokemon.name + ' de favoritos', type: 'error'});
    });
  }

  isFavorite(pokemon) {
    this.pokeService.searchPokemonFavorite(pokemon).subscribe(
      poke => {
        console.log(poke);
        if (poke.length > 0) {
            pokemon.isFavorite = true;
            pokemon.key = poke[0].key;
            this._favorite = true;
        } else {
            this._favorite = false;
            pokemon.isFavorite = false;
        }
        this._poke = pokemon;
      }
    );
  }

}

