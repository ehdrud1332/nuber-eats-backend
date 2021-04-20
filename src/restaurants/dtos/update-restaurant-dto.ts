// create dto에서는 id를 제외한 OmitType으로 되어 있다.
// PartialType은 type의 모든 property를 말하지만 옵션사항이다.

import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDto } from './create-restaurant.dto';

@InputType()
export class UpdateRestaurantInputType extends PartialType(
  CreateRestaurantDto,
) {}

@InputType()
export class UpdateRestaurantDto {
  @Field(type => Number)
  id: number;

  @Field(type => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
