import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './repository/message.repository';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository, UserRepository])],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
