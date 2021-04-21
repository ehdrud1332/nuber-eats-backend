import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entity/users.entities';

// mapping 중 Pick type을 사용한다.
@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateAccountOutput {
  @Field(type => String, { nullable: true })
  error?: string;

  @Field(type => Boolean)
  ok: boolean;
}
