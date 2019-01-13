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

    listCollections(): Observable<any[]> {
      return this.collectionsRef.snapshotChanges().
        pipe(map(items => {            // <== way of chaining
        return items.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return {key, data};           // or {key, ...data} in case data is Obj
        });
    }));
  }
}
