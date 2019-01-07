import { Component, OnInit, Input } from '@angular/core';
import { IPokemon } from '../../models/interfaces/pokemon';
import {PokeListService} from '../../services/poke-list.service';


@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.css']
})
export class PokeCardComponent implements OnInit {

  _pokeResult: IPokemon;
  _poke: any;

  @Input()
  get poke(): IPokemon {
    return this._pokeResult;
  }
  set poke(result: IPokemon) {
    this.pokeService.getPokemon(result.name).subscribe(
      pokemon => {
        console.log(pokemon);
        this._poke = pokemon;
      }
    );
  }

  constructor(private pokeService: PokeListService) { }

  ngOnInit() {
  }

}
