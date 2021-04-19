// entity는 데이터베이스에 저장되는 데이터의 형태를 보여주는 모델이다.
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

// objectType은 자동으로 스키마를 빌드하기 위해 사용하는 GraphQL decorator
// Entity는 TypeORM이 DB에 이걸 저장하게 해준다.
// 이렇게 하면 클래스 하나로 graphQL 스키마와 DB에 저장되는 실제 데이터의 형식을 만들 수 있다.
@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryColumn()
  @Field(type => Number)
  id: number;

  @Field(type => String) // 이 부분은 graphQl을 위한 return
  @Column()
  name: string; // 이건 ts를 위한 return

  @Field(type => Boolean, { nullable: true })
  @Column()
  isVegan?: boolean;

  @Field(type => String)
  @Column()
  address: string;

  @Field(type => String)
  @Column()
  ownerName: string;

  @Field(type => String)
  @Column()
  categoryName: string;
}
