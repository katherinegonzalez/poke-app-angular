import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favsRef: AngularFireList<any>;

  constructor(private rdbFire: AngularFireDatabase) { }

  listFavorites(user: firebase.User): Observable<any[]> {
    this.favsRef = this.rdbFire.list(`favorites/${user.uid}`);
    return this.favsRef.snapshotChanges().
      pipe(map(items => {            // <== new way of chaining
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
  }));
}
}
