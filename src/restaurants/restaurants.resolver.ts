import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { create } from 'domain';

@Resolver(of => Restaurant) // 우리의 resolver는 Restaurant의 resolver가 됐다. 굳이 이렇게 쓰지 않아도 된다.
export class RestaurantsResolver {
  // Query는 typeFunc를 받는다. 무슨 의미이냐면,
  // Query가 return하고자 하는 type을 return하는 function이여야 한다는것이다.
  // Query는 첫번째 args로 함수가 필요하다.

  @Query(returns => [Restaurant]) // gql에서는 [Restaurant] 이렇게 표현
  // ts에서는 Restaurant[] 이렇게 표현
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    return [];
  }
  // inputType은 기본적으로 object 통째로 전달할 수 있도록 해준다.
  @Mutation(returns => Boolean)
  createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
    console.log(createRestaurantDto);
    return true;
  }
}
