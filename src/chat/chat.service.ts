import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/repository/user.repository';
import { MessageEntity } from './models/message.entity';
import { MessageRepository } from './repository/message.repository';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
  ) {}

  defaultChatName = 'public-chat';

  async joinChat(client: Socket, name: string) {
    const userObject = await this.userRepository.createNewUser(name);

    client['user'] = { id: userObject.id, name: userObject.name };
    console.log(client['user']);
    client.join(this.defaultChatName);
    client.emit('join', 'you join to chat successfully');
  }

  async newMessage(
    client: Socket,
    message: string,
    user: { id: number; name: string },
  ) {
    const messageObject = await this.messageRepository.createMessage(
      user.id,
      message,
    );

    const newMessage = {
      message: {
        id: messageObject.id,
        message_content: messageObject.message_content,
      },
      owner: {
        id: user.id,
        name: user.name,
      },
    };

    client.emit('message', newMessage);
    client.to(this.defaultChatName).emit('message', newMessage);
  }
}
