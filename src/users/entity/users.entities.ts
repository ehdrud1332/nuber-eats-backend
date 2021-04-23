import { BeforeInsert, Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entity/core.entities';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum } from 'class-validator';

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
  @IsEmail()
  email: string;

  @Column()
  @Field(type => String)
  password: string;

  // type은 enum이고 enum을 전달해줘야 하는데 이 경우에는 enum: UserRole이 된다.
  @Column({ type: 'enum', enum: UserRole }) // DB에는 type이 enum인 UserRole이 있다.
  @Field(type => UserRole) // type이 UserRole인 graphQl을 가지고 있고
  @IsEnum(UserRole)
  role: UserRole;

  // create User & hash the password
  // hash는 단방향 함수이다.
  // @BeforeInsert Entity안에 어떤 이름이든지 메서드를 정의하고, BeforeInsert라고 mark할 수 있습니다.
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    // bcrypt는 hash 하는데 최고의 module이다.
    // DB에 저장하기 전에 여기 instance의 password를 받아서 hash한다.
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
