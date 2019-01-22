import { Component, OnInit } from '@angular/core';
import { PokeListService } from '../../services/poke-list.service';
import { Observable, of } from 'rxjs';
import { IPokeList } from '../../models/interfaces/poke-list';
import { IPokemon } from '../../models/interfaces/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {

  pokeList: IPokeList;
  pokemons: IPokemon[];
  message: string;

  constructor(
    private pokeService: PokeListService,
    private router: Router) { }

  ngOnInit() {
    window.addEventListener('change', this.searchPokemons.bind(this));
    this.getAllPokemons();
  }

  getAllPokemons() {
    this.pokeService.list().subscribe(
      pokemons => {
        if (pokemons) {
          this.pokeList = pokemons;
          this.pokeList.results = pokemons.results.slice(0, 20);
          this.pokemons = this.pokeList.results;
        } else {
          this.pokemons = [];
          this.message = 'En este momento no hay pokemons para mostrar, intente mas tarde';
        }
      }
    );
  }

  getPokemonSearched (value: string) {
    this.pokeService.getPokemon(value).subscribe(
      pokemon => {
        if (pokemon) {
          const pokeResult = [];
          const poke = {
            name: pokemon.name,
            url: ''
          };
          pokeResult.push(poke);
          this.pokemons = pokeResult;
        } else {
          this.pokemons = [];
          this.message = 'No se encontraron pokemons con este nombre';
        }
      }
    );
  }
  searchPokemons(event) {
    if (this.router.url.includes('pokemons')) {
    if (event.target.id === 'searchPokemon') {
      if (event.srcElement.value === '' || event.srcElement.value === null || event.srcElement.value === undefined) {
        this.getAllPokemons();
      } else {
        this.getPokemonSearched(event.srcElement.value.toLowerCase());
      }
    }
  }
  }



}
