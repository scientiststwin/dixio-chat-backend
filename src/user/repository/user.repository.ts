import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from '../models/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createNewUser(name: string) {
    const newUser = new UserEntity();
    newUser.name = name;

    await this.save(newUser);
    return newUser;
  }
}
