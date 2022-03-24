import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway(8000, { namespace: '/chat' })
export class ChatGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() wss: Server;

  handleConnection(client: any, payload: any) {
    client.emit('status', 'connected');
  }

  handleDisconnect() {}

  @SubscribeMessage('join')
  joinChat(client: Socket, payload: any) {
    const name = payload.name;
    if (!name)
      return client.emit('warn', {
        error: 'you must provide name for joining chat',
      });

    this.chatService.joinChat(client, name);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    const message = payload.message;
    const user = client['user'];
    if (!message)
      return client.emit('warn', {
        error: 'you must provide message for sending message in chat',
      });

    if (!user || !user?.id || !user?.name) {
      return client.emit('warn', {
        error: 'you must join chat before send message to chat',
      });
    }

    this.chatService.newMessage(client, message, user);
  }
}
