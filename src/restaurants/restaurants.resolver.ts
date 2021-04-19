import { Resolver, Query } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';

@Resolver(of => Restaurant) // 우리의 resolver는 Restaurant의 resolver가 됐다. 굳이 이렇게 쓰지 않아도 된다.
export class RestaurantsResolver {
  // Query는 typeFunc를 받는다. 무슨 의미이냐면,
  // Query가 return하고자 하는 type을 return하는 function이여야 한다는것이다.
  // Query는 첫번째 args로 함수가 필요하다.

  @Query(returns => Restaurant)
  myRestaurant() {
    return true;
  }
}
