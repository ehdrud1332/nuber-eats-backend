import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/users.entities';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    // User entity의 InjectRepository를 불어온다.
    // type이 Repository이고 repository type은 user entity가 된다.
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
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
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      // step 1. find the user with the email
      const user = await this.users.findOne({ email });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      // step 2. check if the password is correct
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong Password',
        };
      }
      // step 3. make a jwt and give it to the user
      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
