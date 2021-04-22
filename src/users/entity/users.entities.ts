import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entity/core.entities';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { type } from 'os';

// enum은 열거한다(enumable)는 뜻이다.
enum UserRole {
  Client,
  Owner,
  Delivery,
}

// graphQL에도 추가할 수 있다.
registerEnumType(UserRole, { name: 'UserRole' });

// @InputType({ isAbstract: true })
// ⇧ 이게 무슨 말이냐면 inputType이 스키마에 포함되지 않길 원한다는 것
@InputType({ isAbstract: true }) // **GraphQL decorator**
@ObjectType() // objectType은 자동으로 스키마를 빌드하기 위해 사용하는 **GraphQL decorator**
@Entity() // Entity는 TypeORM이 DB에 이걸 저장하게 해준다.
export class User extends CoreEntity {
  @Column() // DB를 위한 코드
  @Field(type => String) // GraphQL을 위한 코드
  email: string;

  @Column()
  @Field(type => String)
  password: string;

  // type은 enum이고 enum을 전달해줘야 하는데 이 경우에는 enum: UserRole이 된다.
  @Column({ type: 'enum', enum: UserRole }) // DB에는 type이 enum인 UserRole이 있다.
  @Field(type => UserRole) // type이 UserRole인 graphQl을 가지고 있고
  role: UserRole;
}
