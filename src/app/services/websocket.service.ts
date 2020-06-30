import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  private usuario: Usuario = null;
  constructor( private socket: Socket)
  {
    // se escribe en el constructor por que se ejecuta una sola vez
    // el resto de funcionalidades dentro son observables
    this.cargarStorage();
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
  emit( evento: string, payload?: any, callback?: (...args: any[]) => any ): void // Evitar poner Function como tipo esta recomendacion
  // la encontre en stackoverflow si queremos que la funcion tome un indeterminado numero de argumentos y devuelva cualquier cosa
  {
    console.log('Emitiendo', evento);
    // emit('evento', payload, callback)
    this.socket.emit(evento, payload, callback);
  }
  // escucho los mensajes que me envia el servidor, actualmente esta siendo usado por el servicio chatService
  // y renderiza el contenido en el componente chat, para los mensajes
  listen<T>(evento: string ): Observable<T> {
    return this.socket.fromEvent(evento);
  }

  loginWS<T>( nombre: string ): Promise<T>
  {
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, resp => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });

    // this.socket.emit('configurar-usuario', { nombre }, (resp) => {
    //   console.log(resp);
    // });
  }

  getUsuario(): Usuario {
    return this.usuario;
  }

  guardarStorage(): void
  {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage(): void {

    if (localStorage.getItem('usuario'))
    {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      // para mantener el nombre del usuario a pesar de que salga y refresque el navegador
      this.loginWS(this.usuario.nombre);
    }

  }
}
