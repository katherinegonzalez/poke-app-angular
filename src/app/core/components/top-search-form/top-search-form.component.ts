import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokeListService } from '../../../poke-main/services/poke-list.service';

@Component({
  selector: 'app-top-search-form',
  templateUrl: './top-search-form.component.html',
  styleUrls: ['./top-search-form.component.css']
})
export class TopSearchFormComponent implements OnInit {

  @Output() pokemonSearched = new EventEmitter<any>();
  constructor(private pokeListService: PokeListService) { }

  ngOnInit() {

  }

  /*searchPokemons(data: string) {
    this.pokeListService.getPokemon(data).subscribe(
      result => {
        this.pokemonSearched.emit(result);
      }
    );
  }*/

}
