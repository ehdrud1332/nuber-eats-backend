import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';

// module은 두가지가 있는데 1. 정적인 static 모듈, 2. 다이나믹 모듈이 있다.
@Module({})
@Global()
export class JwtModule {
  // 어떻게 하면 아래에 있는 options를 JwtService로 내보낼 수 있을까?
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          // class대신 value로 대체해 줄수 도 있다.
          // 정리해보면 JwtService라는 이름을 가진 provider가 있고, value는 options이다.
          // 이런식으로 providers 안에 필요한 걸 전부 적어주고 NestJs에게 요청하면 된다.
          provide: CONFIG_OPTIONS,
          useValue: options, // privateKey가 담겨있는 options
        },
        JwtService,
      ],
      exports: [JwtService],
    };
    // 다이나믹 모듈은 단지 또 다른 모듈을 반환해주는 모듈이다.
  }
}
