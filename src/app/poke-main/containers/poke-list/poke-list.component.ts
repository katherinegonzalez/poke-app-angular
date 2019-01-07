import { Component, OnInit } from '@angular/core';
import { PokeListService } from '../../services/poke-list.service';
import { Pokemon } from '../../../pokemon';
import { Observable, of } from 'rxjs';
import { IPokeList } from '../../models/interfaces/poke-list';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {

  pokemons: any[] = [];
  pokeList: IPokeList;

  constructor( private pokeService: PokeListService) { }

  ngOnInit() {
    this.pokeService.list().subscribe(
      pokemons => {
        this.pokeList = pokemons;
        this.pokeList.results = pokemons.results.slice(0, 20);

        /*for (let i = 0; i < this.pokemons.length; i++) {
          this.pokeService.getPokemon(this.pokemons[i].name).subscribe(
            pokemon => {
              console.log(pokemon);
              this.pokemons[i].img = pokemon.sprites.front_default;
            }
          );
        }*/
      }
    );
  }



}
