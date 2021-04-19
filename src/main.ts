import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // nestFactory가 AppModule로 부터 application을 생성한다.
  const app = await NestFactory.create(AppModule);
  // validate 유효성검사를 하려면 아래코드를 무조건 작성해야한다.
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
