import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Pokemon} from '../../pokemon';
import { IPokeList } from '../models/interfaces/poke-list';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class PokeListService {

  url = 'https://pokeapi.co/api/v2/pokemon/';



  constructor(private http: HttpClient) { }

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

  private handleError<T>(operation = 'operation', results?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(results as T); // Con of se convierte a un observable
    };
  }
}
