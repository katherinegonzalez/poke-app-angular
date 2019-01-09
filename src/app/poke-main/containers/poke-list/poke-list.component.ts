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

    this.pokeService.list().subscribe(
      pokemons => {
        this.pokeList = pokemons;
        this.pokeList.results = pokemons.results.slice(0, 20);
        this.pokemons = this.pokeList.results;
      }
    );
  }

  searchPokemons(event) {
    this.pokeService.getPokemon(event.srcElement.value).subscribe(
      pokemon => {
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



}
