import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Save user to database
   * @param user
   * @returns Promise<User>>
   */
  saveUser(user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
  }) {
    const data = {
      id: user.id,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
      picture: user.picture,
    };
    return this.usersRepository.save(data);
  }
}
