import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessagesService } from 'src/app/alerts/services/messages.service';
import { Collection } from '../models/collections';


@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  collectionsRef: AngularFireList<any>;
  user: firebase.User;

  constructor(
    private authFire: AngularFireAuth,
    private rdbFire: AngularFireDatabase,
    private alertMessage: MessagesService) {
      authFire.authState.subscribe(
        user => {
          if (user) {
            this.user = user;
            this.collectionsRef = rdbFire.list(`collections/${this.user.uid}`);
          }
        }
      );
    }

    addCollection(collection: Collection): any {
      const promise = this.collectionsRef.push(collection);
      return promise;
    }

    editCollection(key: string, collection: Collection): any {
      const promise = this.collectionsRef.update(key, collection);
      return promise;
    }

    addPokemonToCollection(key: string, pokemon: string, collection: any): any {
      const promise = this.collectionsRef.update(key, {pokemonsCollection: collection.pokemonsCollection.push(pokemon)});
      return promise;
    }
    removeCollection(key: string): any {
      const promise = this.collectionsRef.remove(key);
      return promise;
    }

    listCollections(): Observable<any[]> {
      const userLocalstorage = JSON.parse(localStorage.getItem('angularPokeApp')).user;
      this.collectionsRef = this.rdbFire.list(`collections/${userLocalstorage.uid}`);
      return this.collectionsRef.snapshotChanges().
        pipe(map(items => {            // <== way of chaining
        return items.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return {key, data};           // or {key, ...data} in case data is Obj
        });
    }));
  }

  searchCollection(name: string): Observable<any[]> {
    const userLocalstorage = JSON.parse(localStorage.getItem('angularPokeApp')).user;
    const resultQuery = this.rdbFire.list(`collections/${userLocalstorage.uid}`,
    ref => ref.orderByChild('nameCollection').equalTo(name));
    return resultQuery.snapshotChanges().
      pipe(map(items => {            // <== new way of chaining
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));
  }

  searchPokemonOfCollection(name: string, namePokemon: string): Observable<any[]> {
    const userLocalstorage = JSON.parse(localStorage.getItem('angularPokeApp')).user;
    const resultQuery = this.rdbFire.list(`collections/${userLocalstorage.uid}`,
    ref => ref.orderByChild('nameCollection').equalTo(name));
    return resultQuery.snapshotChanges().
      pipe(map(items => {            // <== new way of chaining
      return items.map(a => {
        let data = <any>{};
        data = a.payload.val();
        const arrayPokemons = [];
        data.pokemonsCollection.forEach( pokemon => {
          if (pokemon === namePokemon) {
            arrayPokemons.push(pokemon);
          }
        });
        data.pokemonsCollection = arrayPokemons;
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));
  }
}
