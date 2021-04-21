import { Resolver, Query } from '@nestjs/graphql';
import { User } from './entity/users.entities';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(returns => Boolean)
  hi() {
    return true;
  }
}