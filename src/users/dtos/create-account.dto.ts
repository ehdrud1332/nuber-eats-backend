import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entity/users.entities';
import { MutationOutput } from '../../common/dtos/output.dto';

// mapping 중 Pick type을 사용한다.
@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateAccountOutput extends MutationOutput {}
