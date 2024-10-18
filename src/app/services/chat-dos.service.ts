import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Mensaje } from '../models/mensaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatDosService {

  public subChat!: any;
  public mesagesCollection : Mensaje[] = [];

  constructor(public fs : Firestore, public auth : AuthService) { }

  agregarChatDos(nuevosMensaje: Mensaje) {
    const col = collection(this.fs, 'chatDos');
    return addDoc(col, nuevosMensaje);
  }

  obtenerChatDos() : Observable<Mensaje[]> {
    const filteredQuery = query
    (
      collection(this.fs, "chatDos"),
      //where('emisor', '==', 'auth.getUserEmail()'),
      orderBy('fecha', 'asc'),
      
    );
    return collectionData(filteredQuery) as Observable<Mensaje[]>
  }
}
