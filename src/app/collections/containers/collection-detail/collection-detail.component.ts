import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../../services/collections.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit {

  pokemons: any[];
  collectionKey: string;
  collectionDescription: string;
  message: string;

  constructor(
    private collectionsService: CollectionsService,
    private router: Router
  ) { }

  ngOnInit() {
    window.addEventListener('change', this.searchPokemons.bind(this));
    this.collectionKey = this.router.url.split('/').pop();
    this.getCollection(this.collectionKey);
  }

  getCollection(key) {
    this.collectionsService.searchCollection(key).subscribe(
      collection => {
        if (collection.length > 0 ) {
          this.pokemons = collection[0].data.pokemonsCollection;
          this.collectionDescription = collection[0].data.descriptionCollection;
        } else {
          this.pokemons = [];
          this.message = 'No hay pokemones en esta colección';
        }

      }
    );
  }

  getPokemonCollectionSearched(name, namePokemon) {
    this.collectionsService.searchPokemonOfCollection(name, namePokemon).subscribe(
      collection => {
        if (collection.length > 0 ) {
          this.pokemons = collection[0].data.pokemonsCollection;
          this.collectionDescription = collection[0].data.descriptionCollection;
        } else {
          this.pokemons = [];
          this.message = 'No hay pokemones en esta colección';
        }

      }
    );
  }

  searchPokemons(event) {
    this.collectionName = this.router.url.split('/').pop();
    if (event.target.id === 'searchPokemon') {
      if (event.srcElement.value === '' || event.srcElement.value === null || event.srcElement.value === undefined) {
        this.getCollection(this.collectionName);
      } else {
        this.getPokemonCollectionSearched(this.collectionName, event.srcElement.value.toLowerCase());
      }
    }
  }

}
