import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';
import { Mensajes } from './models/mensajes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( public wsService: WebsocketService,
               public chatService: ChatService ){}

  ngOnInit(): void
  {
    this.chatService.getMessagesPrivate().subscribe( (msg: Mensajes) => {
      console.log('recibiendo');
      console.log(msg);
    });
  }


}
