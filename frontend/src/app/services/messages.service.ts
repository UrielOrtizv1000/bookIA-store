import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Message } from '../models/message.interface';

// Servicio base para el envio futuro de mensajes de contacto.
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  // Operacion preparada para la integracion con la API de mensajes.
  sendMessage(message: Message): Observable<Message> {
    void message;
    return EMPTY;
  }
}
