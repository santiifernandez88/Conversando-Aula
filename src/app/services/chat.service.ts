import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, onSnapshot, query } from '@angular/fire/firestore';
import { Mensaje } from '../models/mensaje';
import { limit, orderBy, where } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public subChat!: any;
  public mesagesCollection : Mensaje[] = [];

  constructor(public fs : Firestore, public auth : AuthService) { }
  
  agregarChatUno(nuevosMensaje: Mensaje) {
    const col = collection(this.fs, 'chatUno');
    return addDoc(col, nuevosMensaje);
  }

  

  
  obtenerChatUno() : Observable<Mensaje[]> {
    const filteredQuery = query
    (
      collection(this.fs, "chatUno"),
      //where('emisor', '==', 'auth.getUserEmail()'),
      orderBy('fecha', 'asc'),
      
    );
    return collectionData(filteredQuery) as Observable<Mensaje[]>
  }

  

 
}

