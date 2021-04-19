import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';

// AppModule은 main.ts로 import되는 유일한 모듈이다.
// main.ts는 우리의 application을 실행하기 위한 것!

// GraphQLModule을 import하고 rootModule을 설정해준다.
// rootModule에 해당하는게 forRoot이다.

@Module({
  imports: [
    RestaurantsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'seongjaemin',
      password: '1225',
      database: 'nuber-eats',
      // synchronize: true는 TypeORM이 데이터베이스에 연결할 때 데이터베이스를 나의 모듈의 현재 상태로 마이스래이션한다는 뜻
      synchronize: true,
      // logging은 데이터베이스에서 무슨 일이 일어나는지 콘솔에 표시하는것
      logging: true,
    }),
    GraphQLModule.forRoot({
      // 기본적으로 이것이 schema파일을 만들어낸다. schema.gql파일을 따로 가지고 있지 않아도 된다는 의미.
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
