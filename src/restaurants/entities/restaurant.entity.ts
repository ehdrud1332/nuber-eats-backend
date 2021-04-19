// entity는 우리의 데이터베이스에 있는 모델을 상상하면 된다.
import { Field, ObjectType } from '@nestjs/graphql';

//ObjectType을 만들어줌으로써 이제 Restaurant Entity를 가지게 됐다.
@ObjectType()
export class Restaurant {
  @Field(type => String) // 이 부분은 graphQl을 위한 return
  name: string; // 이건 ts를 위한 return

  @Field(type => Boolean, { nullable: true })
  isVegan?: boolean;

  @Field(type => String)
  address: string;

  @Field(type => String)
  ownerName: string;
}
