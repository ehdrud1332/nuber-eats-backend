import { Module } from '@nestjs/common';
import { RestaurantsResolver } from './restaurants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

// module은 import, providers를 가지고 있다.
@Module({
  imports: [
    // TypeORM을 이용해서 Restaurant repository를 import 했다.
    // repository를 inject하고나면 restaurants.module에서 모든게 돌아간다.
    TypeOrmModule.forFeature([
      // 이곳은 entity를 넣는 곳.
      Restaurant,
    ]),
  ],
  providers: [RestaurantsResolver, RestaurantsService],
})
export class RestaurantsModule {}
