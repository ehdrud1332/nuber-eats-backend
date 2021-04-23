import { MutationOutput } from '../../common/dtos/output.dto';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entity/users.entities';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends MutationOutput {
  // ok, error와 별개로 Login이 token을 return 할 예정
  @Field(type => String, { nullable: true })
  token?: string;
}
