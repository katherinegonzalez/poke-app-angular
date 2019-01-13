import { Component, OnInit, Input } from '@angular/core';
import {PokeListService} from '../../../poke-main/services/poke-list.service';
import { IPokemon } from '../../../poke-main/models/interfaces/pokemon';

@Component({
  selector: 'app-favorite-poke-card',
  templateUrl: './favorite-poke-card.component.html',
  styleUrls: ['./favorite-poke-card.component.css']
})

export class FavoritePokeCardComponent implements OnInit {

  _pokeResult: IPokemon;
  _poke: any;

  @Input()
  get poke(): any {
    return this._poke;
  }
  set poke(result: any) {
    this._poke = result;
  }

  constructor(private pokeService: PokeListService) { }

  ngOnInit() {
  }

  removeFavorite(pokemon) {
    this.pokeService.removeFavorite(pokemon);
  }

}
