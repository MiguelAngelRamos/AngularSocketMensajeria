import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
// pipe async hace la desruccion cuando el componente deja de exitir
  usuariosActivosObs: Observable<any>;
  // cuando tenga el tipo de usuario, donde viene el id la sala y el nombre
  // deberia ir en any
  constructor( public chatService: ChatService ) { }

  ngOnInit(): void {
    this.usuariosActivosObs = this.chatService.getUsuariosActivos();

    // emitir el obtener usuarios que escuche el observable de arriba
    this.chatService.emitirUsuariosActivos();
  }

}
