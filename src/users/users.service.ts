import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/users.entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    // User entity의 InjectRepository를 불어온다.
    // type이 Repository이고 repository type은 user entity가 된다.
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}
}
