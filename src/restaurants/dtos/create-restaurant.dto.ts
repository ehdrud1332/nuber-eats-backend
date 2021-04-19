// dto는  data transfer object

import { ArgsType, Field, InputType } from '@nestjs/graphql';
// inputType은 내가 input 하고자 하는 data의 type이다.

// ArgsType은 기본적으로 이것들을 분리된 args로써 정의할 수 있게 해준다.
// InputType은 하나의 object이다 args로써 graphQL에 전달하기 위한 용도.
@ArgsType()
export class CreateRestaurantDto {
  @Field(type => String)
  name: string;
  @Field(type => Boolean)
  isVegan: boolean;
  @Field(type => String)
  address: string;
  @Field(type => String)
  ownerName: string;
}
