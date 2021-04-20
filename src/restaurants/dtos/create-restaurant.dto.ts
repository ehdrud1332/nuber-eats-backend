// dto는  data transfer object

import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';
import { Column } from 'typeorm';
// inputType은 내가 input 하고자 하는 data의 type이다.
// ArgsType은 기본적으로 이것들을 분리된 args로써 정의할 수 있게 해준다.

// InputType은 하나의 object이다 args로써 graphQL에 전달하기 위한 용도.
// inputType은 기본적으로 object 통째로 전달할 수 있도록 해준다.
@ArgsType()
export class CreateRestaurantDto {
  @Field(type => String)
  @IsString()
  @Length(5, 10)
  name: string;

  @Field(type => Boolean)
  @IsBoolean()
  isVegan: boolean;

  @Field(type => String)
  @IsString()
  address: string;

  @Field(type => String)
  @IsString()
  ownerName: string;
}
