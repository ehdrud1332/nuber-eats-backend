import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Resolver(of => Restaurant) // 우리의 resolver는 Restaurant의 resolver가 됐다. 굳이 이렇게 쓰지 않아도 된다.
export class RestaurantsResolver {
  constructor(private readonly restaurantService: RestaurantsService) {} // RestaurantService를 불어오는 곳
  // Query는 typeFunc를 받는다. 무슨 의미이냐면,
  // Query가 return하고자 하는 type을 return하는 function이여야 한다는것이다.
  // Query는 첫번째 args로 함수가 필요하다.

  @Query(returns => [Restaurant]) // gql에서는 [Restaurant] 이렇게 표현
  // ts에서는 Restaurant[] 이렇게 표현
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }
  @Mutation(returns => Boolean)
  async createRestaurant(
    @Args('input') createRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantDto);
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
