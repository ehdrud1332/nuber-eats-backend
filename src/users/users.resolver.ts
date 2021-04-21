import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './entity/users.entities';
import { UsersService } from './users.service';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(returns => Boolean)
  hi() {
    return true;
  }

  @Mutation(returns => CreateAccountOutput)
  createAccount(@Args('input') createAccountInput: CreateAccountInput) {}
}
