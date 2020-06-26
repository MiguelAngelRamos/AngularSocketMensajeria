import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  constructor( private socket: Socket)
  {
    // se escribe en el constructor por que se ejecuta una sola vez
    // el resto de funcionalidades dentro son observables
    this.checkStatus();
  }

  checkStatus(): void
  {
    // cuando se conecta
    this.socket.on('connect', () => {
      console.log('Conectado al Servidor');
      this.socketStatus = true;
    });

    // cuando se desconecta
    this.socket.on('disconnect', () => {
      console.log('Desconectado del Servidor');
      this.socketStatus = false;
    });
  }

  // emitir
  emit( evento: string, payload?: any, callback?: VoidFunction ): void
  {
    console.log('Emitiendo', evento);
    // emit('evento', payload, callback)
    this.socket.emit(evento, payload, callback);
  }

  listen<T>(evento: string ): Observable<T> {
    return this.socket.fromEvent(evento);
  }
}
