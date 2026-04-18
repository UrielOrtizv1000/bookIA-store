import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Message } from '../models/message.interface';

interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

interface ApiMessage {
  id?: number;
  nombre?: string;
  correo?: string;
  asunto?: string;
  mensaje?: string;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Servicio para el envio de mensajes de contacto.
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  // Conexion centralizada con la API de mensajes.
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/messages';

  sendMessage(message: Message): Observable<Message> {
    return this.http
      .post<ApiResponse<ApiMessage> | ApiMessage>(
        this.apiUrl,
        this.createMessagePayload(message),
      )
      .pipe(
        map((response) => this.readData(response)),
        map((createdMessage) => this.normalizeMessage(createdMessage)),
      );
  }

  private readData<T>(response: ApiResponse<T> | T): T {
    if (
      typeof response === 'object' &&
      response !== null &&
      'data' in response
    ) {
      return response.data;
    }

    return response as T;
  }

  private normalizeMessage(message: ApiMessage): Message {
    return {
      id: message.id,
      nombre: String(message.nombre ?? message.name ?? ''),
      correo: String(message.correo ?? message.email ?? ''),
      asunto: String(message.asunto ?? message.subject ?? ''),
      mensaje: String(message.mensaje ?? message.message ?? ''),
    };
  }

  private createMessagePayload(message: Message): Record<string, unknown> {
    return {
      name: message.nombre,
      email: message.correo,
      subject: message.asunto,
      message: message.mensaje,
    };
  }
}
