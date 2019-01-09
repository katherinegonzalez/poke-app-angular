import { Component, OnInit } from '@angular/core';
import { PokeListService } from '../../services/poke-list.service';
import { Observable, of } from 'rxjs';
import { IPokeList } from '../../models/interfaces/poke-list';
import { IPokemon } from '../../models/interfaces/pokemon';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {

  pokeList: IPokeList;
  pokemons: IPokemon[];


  constructor( private pokeService: PokeListService) { }

  ngOnInit() {
    window.addEventListener('change', this.searchPokemons.bind(this));

    this.getAllPokemons();
  }

  getAllPokemons() {
    this.pokeService.list().subscribe(
      pokemons => {
        this.pokeList = pokemons;
        this.pokeList.results = pokemons.results.slice(0, 20);
        this.pokemons = this.pokeList.results;
      }
    );
  }

  getPokemonSearched (value: string) {
    this.pokeService.getPokemon(value).subscribe(
      pokemon => {
        console.log(pokemon);
        const pokeResult = [];
        const poke = {
          name: pokemon.name,
          url: ''
        };
        pokeResult.push(poke);
        this.pokemons = pokeResult;
      }
    );
  }
  searchPokemons(event) {

    if (event.srcElement.value === '' || event.srcElement.value === null || event.srcElement.value === undefined) {
      this.getAllPokemons();
    } else {
      this.getPokemonSearched(event.srcElement.value.toLowerCase());
    }
  }



}
