import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entity/users.entities';
import { KeyObject } from 'crypto';
import { JwtModule } from './jwt/jwt.module';

// AppModule은 main.ts로 import되는 유일한 모듈이다.
// main.ts는 우리의 application을 실행하기 위한 것!

// GraphQLModule을 import하고 rootModule을 설정해준다.
// rootModule에 해당하는게 forRoot이다.

@Module({
  imports: [
    ConfigModule.forRoot({
      // IsGlobal은 나의 어플리케이션의 어디서나 config 모듈에 접근할 수 있다는 것
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      // ignoreEnvFile은 서버에 deploy 할 때 환경변수 파일을 사용하지 않는다는것.
      // production 환경일 때는 ConfigModule이 환경변수 파일을 무시한다.
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      // validationSchema라는 건 내가 원하는 모든 환경 변수의 유효성을 검사할 수 있다.
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        SECRET_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      // TypeORM의 설정옵션은 port가 number여야한다.
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // synchronize: true는 TypeORM이 데이터베이스에 연결할 때 데이터베이스를 나의 모듈의 현재 상태로 마이스래이션한다는 뜻
      synchronize: process.env.NODE_ENV !== 'prod',
      // logging은 데이터베이스에서 무슨 일이 일어나는지 콘솔에 표시하는것
      logging: process.env.NODE_ENV !== 'prod',
      entities: [User], // TypeOrModule에서 entity에 Restaurant를 넣어 줬기 때문에 DB가 되는 것!
    }),
    GraphQLModule.forRoot({
      // 기본적으로 이것이 schema파일을 만들어낸다. schema.gql파일을 따로 가지고 있지 않아도 된다는 의미.
      autoSchemaFile: true,
    }),
    JwtModule.forRoot(),
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
