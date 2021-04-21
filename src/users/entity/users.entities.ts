import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entity/core.entities';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

type UserRole = 'client' | 'owner' | 'delivery';

// 이렇게 하면 클래스 하나로 graphQL 스키마와 DB에 저장되는 실제 데이터의 형식을 만들 수 있다.

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

  @Column()
  @Field(type => String)
  role: UserRole;
}
