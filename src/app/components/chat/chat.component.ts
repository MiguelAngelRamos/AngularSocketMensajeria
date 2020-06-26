import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { Mensajes } from '../../models/mensajes';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  texto = '';
  mensajesSubscription: Subscription;
  mensajes: Mensajes[] = [];
  @ViewChild('chatmensajes', {static: false }) chatMensaje: ElementRef;

  constructor( public chatService: ChatService) { }

  ngOnInit(): void
  {
    this.mensajesSubscription = this.chatService.getMessages().subscribe( (msg: Mensajes)  => {
      console.log(msg);
      this.mensajes.push(msg);

      // setTimeout( () => {
      //   this.chatMensaje.nativeElement.scrollTop = this.chatMensaje.nativeElement.scrollHeight;
      // }, 50)
      this.scrollToBottom();

    });
  }

  ngAfterViewChecked(): void
  {
    this.scrollToBottom();
  }

  ngOnDestroy(): void
  {
    this.mensajesSubscription.unsubscribe();
  }

  scrollToBottom(): void {
    try {
      this.chatMensaje.nativeElement.scrollTop = this.chatMensaje.nativeElement.scrollHeight;
  } catch (err) { }
  }


  enviar(): void
  {
    if( this.texto.trim().length === 0 ){
      return;
    }
    console.log(this.texto);
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

}
