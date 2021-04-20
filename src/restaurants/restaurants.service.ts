// service를 만든다. resolver에서 만들어도 된다.

import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant) // Restaurant entity의 reposiitory를 inject하고 있다.
    private readonly restaurants: Repository<Restaurant>, // 이름은 restaurants이고 class는 Repository entity를 가진 Repository이다.
  ) {}
  // 실제로 DB에 접근하는 방식으로 작성.
  getAll(): Promise<Restaurant[]> {
    // this.restaurants. 을 했을때 Repository에 접근해 모든 걸 할 수 있다.
    return this.restaurants.find();
  }
  // method는 class안에 있는 function이다.
  createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(newRestaurant);
  }
}
