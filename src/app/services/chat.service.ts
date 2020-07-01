import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public wsService: WebsocketService) { }

  sendMessage( mensaje: string): void
  {
    const payload = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje
    };
    this.wsService.emit( 'mensaje' , payload);
  }

  getMessages<T>(): Observable<T>
  {
    return this.wsService.listen( 'mensaje-nuevo' );
  }

  getMessagesPrivate<T>(): Observable<T>
  {
    return this.wsService.listen( 'mensaje-privado' );
  }

  getUsuariosActivos<T>(): Observable<T> {
    return this.wsService.listen( 'usuarios-activos' );
  }

  emitirUsuariosActivos(): void {
    this.wsService.emit('obtener-usuarios');
  }
}
