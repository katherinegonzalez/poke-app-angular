import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Pokemon} from '../../pokemon';
import { IPokeList } from '../models/interfaces/poke-list';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { MessagesService } from 'src/app/alerts/services/messages.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class PokeListService {

  url = 'https://pokeapi.co/api/v2/pokemon/';
  favsRef: AngularFireList<any>;
  user: firebase.User;


  constructor(
    private http: HttpClient,
    private authFire: AngularFireAuth,
    private rdbFire: AngularFireDatabase,
    private alertMessage: MessagesService) {
      authFire.authState.subscribe(
        user => {
          if (user) {
            this.user = user;
            this.favsRef = rdbFire.list(`favorites/${this.user.uid}`);
          }
        }
      );
    }

  list(): Observable<IPokeList> {
    return this.http.get<IPokeList>(this.url)
    .pipe(
      catchError(this.handleError('Get Pokemons List', null))
    );
  }

  getPokemon(name: string): Observable<any> {
    const urlDetail = `${this.url}${name}/`;
    return this.http.get<any>(urlDetail).pipe(
      catchError(this.handleError(`getPokemon name=${name}`))
    );
  }

  addFavorite(pokemon: any) {
    const promise = this.favsRef.push(pokemon);
    promise.then(_ => {
      this.alertMessage.message({msg: pokemon.name + ' ha sido agregado a favoritos', type: 'success'});
    });
  }

  removeFavorite(pokemon: any) {
    const promise = this.favsRef.remove(pokemon.key);
    promise.then(_ => {
      this.alertMessage.message({msg: 'Has quitado a ' + pokemon.data.name + ' de favoritos', type: 'success'});
    });
  }

  private handleError<T>(operation = 'operation', results?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(results as T); // Con of se convierte a un observable
    };
  }

}
