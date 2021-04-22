import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/users.entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dtos/create-account.dto';

@Injectable()
export class UsersService {
  constructor(
    // User entity의 InjectRepository를 불어온다.
    // type이 Repository이고 repository type은 user entity가 된다.
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  // createAccountInput을 type으로 받는다
  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ email });
      // 회원가입 순서
      // 1. 사용자 데이터베아스에 존재하지 않는 email인지 확인 해야 할 필요가 있다.
      if (exists) {
        // make error 이메일이 존재한다는 뜻이니까
        return { ok: false, error: 'There is a user with that email already' };
      } else {
        await this.users.save(this.users.create({ email, password, role }));
        return { ok: true };
      }
    } catch (e) {
      // make error
      return { ok: false, error: "Couldn't create account" };
    }

    // create User & hash the password
  }
}
