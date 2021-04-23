import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';

// module은 두가지가 있는데 1. 정적인static 모듈, 2. 다이나믹 모듈이 있다.
@Module({})
@Global()
export class JwtModule {
  static forRoot(): DynamicModule {
    // 다이나믹 모듈은 단지 또 다른 모듈을 반환해주는 모듈이다.
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [JwtService],
    };
  }
}
