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
  collectionName: string;
  collectionDescription: string;
  message: string;

  constructor(
    private collectionsService: CollectionsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.collectionName = this.router.url.split('/').pop();
    this.getCollection(this.collectionName);
  }

  getCollection(name) {
    this.collectionsService.searchCollection(name).subscribe(
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

}
