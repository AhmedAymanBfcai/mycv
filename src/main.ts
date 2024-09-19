import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // This will make sure that any additional properties that we send alog with the reuqest will  be stripped automatically
    })
  )

  await app.listen(3000);
}
bootstrap();
