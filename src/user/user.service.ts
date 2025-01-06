import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findUser(email: string, select?: (keyof User)[] | undefined) {
    return this.usersRepository.findOne({
      where: { email },
      select: select,
    });
  }
}
