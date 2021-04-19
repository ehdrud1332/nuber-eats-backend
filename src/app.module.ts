import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RestaurantsModule } from './restaurants/restaurants.module';

// AppModule은 main.ts로 import되는 유일한 모듈이다.
// main.ts는 우리의 application을 실행하기 위한 것!

// GraphQLModule을 import하고 rootModule을 설정해준다.
// rootModule에 해당하는게 forRoot이다.

@Module({
  imports: [
    GraphQLModule.forRoot({
      // 기본적으로 이것이 schema파일을 만들어낸다. schema.gql파일을 따로 가지고 있지 않아도 된다는 의미.
      autoSchemaFile: true,
    }),
    RestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
