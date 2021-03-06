import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollectionsService } from '../../services/collections.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit, OnDestroy {

  pokemons: any[];
  collectionKey: string;
  collectionName: string;
  collectionDescription: string;
  message: string;
  private subscriptionGetCollection: any;
  private subscriptionGetPokemonCollection: any;

  constructor(
    private collectionsService: CollectionsService,
    private router: Router
  ) { }

  ngOnInit() {
    window.addEventListener('change', this.searchPokemons.bind(this));
    this.collectionKey = this.router.url.split('/').pop();
    this.getCollection(this.collectionKey);
  }

  ngOnDestroy() {

    if (this.subscriptionGetCollection !== undefined && this.subscriptionGetCollection !== null) {
      this.subscriptionGetCollection.unsubscribe();
    }
    if (this.subscriptionGetPokemonCollection !== undefined && this.subscriptionGetPokemonCollection !== null) {
      this.subscriptionGetPokemonCollection.unsubscribe();
    }
  }

  getCollection(key) {
    this.subscriptionGetCollection = this.collectionsService.searchCollection(key).subscribe(
      collection => {
        if (collection.length > 0 ) {
          this.pokemons = collection[0].data.pokemonsCollection;
          this.collectionDescription = collection[0].data.descriptionCollection;
          this.collectionName = collection[0].data.nameCollection;

        } else {
          this.pokemons = [];
          this.message = 'No hay pokemones en esta colección';
        }

      }
    );
  }

  getPokemonCollectionSearched(key, namePokemon) {
    this.subscriptionGetPokemonCollection = this.collectionsService.searchPokemonOfCollection(key, namePokemon).subscribe(
      collection => {
        if (collection.length > 0 ) {
          this.pokemons = collection[0].data.pokemonsCollection;
          this.collectionDescription = collection[0].data.descriptionCollection;
          if (this.pokemons.length === 0) {
            this.message = 'No se encontraron pokemons con este nombre';
          }

        } else {
          this.pokemons = [];
          this.message = 'No se encontraron colecciones';
        }

      }
    );
  }

  searchPokemons(event) {
    if (this.router.url.includes('collection')) {
      this.collectionKey = this.router.url.split('/').pop();
      if (event.target.id === 'searchPokemon') {
        if (event.srcElement.value === '' || event.srcElement.value === null || event.srcElement.value === undefined) {
          this.getCollection(this.collectionKey);
        } else {
          this.getPokemonCollectionSearched(this.collectionKey, event.srcElement.value.toLowerCase());
        }
      }
    }
  }

}
