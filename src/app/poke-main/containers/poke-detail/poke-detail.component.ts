import { Component, OnInit } from '@angular/core';
import { PokeListService } from '../../services/poke-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.css']
})
export class PokeDetailComponent implements OnInit {

  constructor(private pokeListService: PokeListService, private router: Router) { }
  pokemonName: string;
  _poke: any;
  ngOnInit() {

    this.pokemonName = this.router.url.split('/').pop(); // this.router.currentUrlTree.root.children.primary.segments[3].path;

    console.log(this.router.url);
    this.pokeListService.getPokemon(this.pokemonName).subscribe(
      pokemon => {
        this._poke = pokemon;
        console.log(pokemon);
      }
    );
  }

}
