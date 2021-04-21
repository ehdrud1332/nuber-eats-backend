import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entities';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  // TypeORM을 이용해서 User repository를 import 했다.
  // forFeature는 TypeOrmModule이 특정 feature를 import할 수 있게 도와줌.
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
