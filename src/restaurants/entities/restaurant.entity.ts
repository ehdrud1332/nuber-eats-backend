// entity는 데이터베이스에 저장되는 데이터의 형태를 보여주는 모델이다.
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

// Repository는 Entity랑 상호작용하는걸 담당한다.
// NestJS에서 Data Mapper 방법을 쓰는 이유는 NestJs + TypeORM 개발 환경에서 Reposioty를 사용하는 모듈을 쓸 수 있기 때문이다.
// 그리고 Repository를 사용하면 어디서든지 접근할 수가 있다.
// 실제로 구현하는 서비스에서 접근이 가능하고 테스팅할 때도 접근이 가능하다.

// objectType은 자동으로 스키마를 빌드하기 위해 사용하는 GraphQL decorator
// 이렇게 하면 클래스 하나로 graphQL 스키마와 DB에 저장되는 실제 데이터의 형식을 만들 수 있다.
// @InputType({ isAbstract: true })
// ⇧ 이게 무슨 말이냐면 inputType이 스키마에 포함되지 않길 원한다는 것
@InputType({ isAbstract: true })
@ObjectType()
@Entity() // Entity는 TypeORM이 DB에 이걸 저장하게 해준다.
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;

  @Field(type => String) // 이 부분은 graphQl을 위한 return
  @Column()
  @IsString()
  @Length(5)
  name: string; // 이건 ts를 위한 return

  @Field(type => Boolean, { defaultValue: true }) // GraphQL을 위한 코드
  @Column({ default: true }) // DB를 위한 코드
  // IsOptional은  value가 누락됐는지 확인하고, 없다면 모든 validator를 무시한다.
  // IsOptional은 해당 필드를 보내거나 보내지 않을 수 없다는 걸 의미한다.
  @IsOptional() // DTO를 위한 코드
  @IsBoolean() // DTO를 위한 코드
  isVegan: boolean;

  @Field(type => String)
  @Column()
  @IsString()
  address: string;

  // @Field(type => String)
  // @Column()
  // @IsString()
  // ownerName: string;
  //
  // @Field(type => String)
  // @Column()
  // @IsString()
  // categoryName: string;
}
