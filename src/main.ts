import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // nestFactory가 AppModule로 부터 application을 생성한다.
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
