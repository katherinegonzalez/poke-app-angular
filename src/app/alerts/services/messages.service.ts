import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs'; // Subject va a hacer el servicio de cola de mensajes
import { IMessage } from '../models/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private subject = new Subject<any>();
  constructor() { }

  // Servicio que publica el mensaje
  message(msg: IMessage) {
    this.subject.next(msg);
  }

  // Función para leer un mensaje
  getMessage(): Observable<IMessage> {
    return this.subject.asObservable();
  }

  // Ahora se implementa quien escucha el mensaje
}
