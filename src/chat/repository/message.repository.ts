import { EntityRepository, Repository } from 'typeorm';

import { MessageEntity } from '../models/message.entity';

@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {
  async createMessage(userId: number, message: string) {
    const newMessage = new MessageEntity();
    newMessage.user_id = userId;
    newMessage.message_content = message;

    await this.save(newMessage);
    return newMessage;
  }
}
