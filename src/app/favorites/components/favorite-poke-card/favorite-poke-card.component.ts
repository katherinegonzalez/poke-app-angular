import { Component, OnInit, Input } from '@angular/core';
import {PokeListService} from '../../../poke-main/services/poke-list.service';
import { IPokemon } from '../../../poke-main/models/interfaces/pokemon';
import { MessagesService } from 'src/app/alerts/services/messages.service';


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

  constructor(
    private pokeService: PokeListService,
    private alertMessage: MessagesService) { }

  ngOnInit() {
  }

  removeFavorite(pokemon) {
    this.pokeService.removeFavorite(pokemon.key, pokemon.data.name)
    .then(_ => {
      this.alertMessage.message({msg: 'Has quitado a ' + pokemon.data.name + ' de favoritos', type: 'success'});
    }, (error) => {
      this.alertMessage.message({msg: 'No fue posible quitar a ' + pokemon.data.name + ' de favoritos', type: 'error'});
    });
  }

}
